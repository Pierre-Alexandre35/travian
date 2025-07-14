#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------------------
# Configuration — adjust to your values
# -----------------------------------------------------------------------------
# GCP SSH target
INSTANCE="instance-20250713-175604"
ZONE="europe-west9-b"
SSH_USER="travianopensource"

# Where on the VM we'll keep the code
REMOTE_APP_DIR="/home/${SSH_USER}/app"

# Your Git repo containing the Alembic migrations & backend code
REPO_URL="git@github.com:your-org/your-repo.git"
REPO_BRANCH="main"

# Database URL as seen from the VM (here Postgres runs locally on the VM)
DATABASE_URL="postgresql://pierre:password@localhost:5432/pierre"

# -----------------------------------------------------------------------------
# 1) Ensure we can SSH
# -----------------------------------------------------------------------------
echo "🔑 Testing SSH connectivity to ${SSH_USER}@${INSTANCE}..."
gcloud compute ssh "${SSH_USER}@${INSTANCE}" \
  --zone="${ZONE}" --command="echo SSH OK" >/dev/null

# -----------------------------------------------------------------------------
# 2) Deploy code and run migrations
# -----------------------------------------------------------------------------
echo "🚀 Deploying code & running migrations on VM..."

gcloud compute ssh "${SSH_USER}@${INSTANCE}" --zone="${ZONE}" --command "
  set -euo pipefail

  # 2a) Clone or update the repo
  if [ ! -d \"${REMOTE_APP_DIR}\" ]; then
    echo '📥 Cloning repository...'
    git clone -b ${REPO_BRANCH} ${REPO_URL} ${REMOTE_APP_DIR}
  fi

  cd ${REMOTE_APP_DIR}
  echo '🔄 Fetching latest changes...'
  git fetch origin ${REPO_BRANCH}
  git reset --hard origin/${REPO_BRANCH}

  # 2b) Set up virtualenv & install deps
  echo '🐍 Setting up virtualenv...'
  python3 -m venv venv
  source venv/bin/activate
  pip install --upgrade pip
  echo '📦 Installing requirements...'
  pip install -r backend/requirements.txt

  # 2c) Run Alembic migrations
  echo '⬆️  Applying Alembic migrations...'
  export DATABASE_URL='${DATABASE_URL}'
  cd backend
  alembic upgrade head

  echo '✅ Migrations completed.'
"

echo -e "\n🎉 Database schema is up‐to‐date on ${INSTANCE}!"
