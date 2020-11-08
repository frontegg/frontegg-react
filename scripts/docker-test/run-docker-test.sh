#!/usr/bin/env bash

BASEDIR=$(pwd)

cd "${BASEDIR}/../../packages/demo-saas"

docker build -t test-demo-saas:latest -f ../../scripts/docker-test/Dockerfile .
