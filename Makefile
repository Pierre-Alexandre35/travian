# Makefile to execute SQL script

# Path to the SQL script
INIT_SQL_SCRIPT_PATH=travian/database/sql/init.sql
DATA_SQL_SCRIPT_PATH=travian/database/sql/data.sql

.PHONY: init-db
init-db:
	@echo "Initializing database..."
	@psql -d postgres -f $(INIT_SQL_SCRIPT_PATH)
	@echo "Master and Transactions tables created.."
	@psql -d postgres -f $(DATA_SQL_SCRIPT_PATH)
	@echo "Master table populated with values.."
