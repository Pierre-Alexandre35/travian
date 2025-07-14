#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------------------
# Self-locate: move into the repository root
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"
echo "📂  Working directory: $REPO_ROOT"

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
PROJECT="travian-4012"
REGION="europe-west1"
SERVICE="backend-service"
IMAGE="gcr.io/${PROJECT}/backend:latest"
DATABASE_URL="postgresql://pierre:password@34.163.113.47:5432/pierre?sslmode=require"

# -----------------------------------------------------------------------------
# 1) Build & push with Cloud Build (guaranteed AMD64)
# -----------------------------------------------------------------------------
echo "🔨  Submitting build to Cloud Build (AMD64) for ${IMAGE}..."
gcloud builds submit backend/ \
  --tag="${IMAGE}" \
  --region="${REGION}" \
  --project="${PROJECT}"

# -----------------------------------------------------------------------------
# 2) Deploy to Cloud Run
# -----------------------------------------------------------------------------
echo "☁️  Deploying to Cloud Run (${SERVICE} in ${REGION})..."
gcloud run deploy "${SERVICE}" \
  --image="${IMAGE}" \
  --region="${REGION}" \
  --platform=managed \
  --allow-unauthenticated \
  --set-env-vars="DATABASE_URL=${DATABASE_URL}"



echo
echo "✅  Deployment complete!"
echo "🌐  Your service is live at: https://api.vallorium.com/"
