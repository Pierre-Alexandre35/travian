import psycopg2
from psycopg2.extras import DictCursor, DictRow


class Database:
    """PostgreSQL Database class."""

    def __init__(self, host, username, password, port, dbname):
        self.host = host
        self.username = username
        self.password = password
        self.port = port
        self.dbname = dbname
        self.conn = None
        psycopg2.extras.register_uuid()

    def connect(self) -> None:
        """Connect to a Postgres database."""
        if self.conn is None:
            try:
                self.conn = psycopg2.connect(
                    host=self.host,
                    user=self.username,
                    password=self.password,
                    port=self.port,
                    dbname=self.dbname,
                )
            except psycopg2.DatabaseError as e:
                raise e
            finally:
                print("Connection opened successfully.")

    def execute_query(self, query: str, parameters=None, fetch=False):
        """Execute a SQL query optionally fetching results."""
        self.connect()
        with self.conn.cursor() as cur:
            cur.execute(query, parameters)
            self.conn.commit()
            if fetch:
                result = cur.fetchone()
                return result[0] if result else None
            return f"{cur.rowcount} rows affected."

    def select_rows(self, query: str) -> list[tuple]:
        """Run a SQL query to select rows from table."""
        return self.execute_query(query, fetch=True)

    def select_rows_dict_cursor(self, query: str, parameters=None) -> list[DictRow]:
        """Run SELECT query and return dictionaries."""
        self.connect()
        with self.conn.cursor(cursor_factory=DictCursor) as cur:
            cur.execute(query, parameters)
            records = cur.fetchall()
        return records

    def select_first_record(self, query: str, parameters=None) -> DictRow:
        """Run SELECT query and return the first record as a dictionary."""
        self.connect()
        with self.conn.cursor(cursor_factory=DictCursor) as cur:
            cur.execute(query, parameters)
            return cur.fetchone()

    def update_rows(self, query: str, parameters=None, fetch=False) -> str:
        """Run a SQL query to update rows in table, optionally fetching a result."""
        return self.execute_query(query, parameters, fetch)
