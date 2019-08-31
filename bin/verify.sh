#!/usr/bin/env bash

set -eux

export PATH=./node_modules/.bin:$PATH
readonly TARGET=list
readonly SOURCE_TARGET=$(ls dstructure/*.ts | grep -v '.test.' | grep "${TARGET}")
readonly TEST_TARGET=$(ls dstructure/*.test.ts | grep "${TARGET}")

function format {
    local target=${1?ERROR: mandatory target is not provided}
    local line_length=88
    local tab_width=4

    prettier --print-width $line_length --tab-width $tab_width \
        --no-bracket-spacing --arrow-parens always --trailing-comma es5 \
        --write $target
}

function validate {
    local target=${1?ERROR: mandatory target is not provided}

    tslint --format verbose $target
}

function compile {
    local target=${1?ERROR: mandatory target is not provided}

    tsc --target es2019 --module commonjs \
        --incremental --tsBuildInfoFile .tsbuildinfo \
        --strictNullChecks --noImplicitAny --experimentalDecorators \
        $target
}

function verify {
    local target=${1?ERROR: mandatory target is not provided}

    jest ${target//.ts/.js}
}

format "${SOURCE_TARGET}"
validate "${SOURCE_TARGET}"
compile "${SOURCE_TARGET}"

format "${TEST_TARGET}"
validate "${TEST_TARGET}"
compile "${TEST_TARGET}"
verify "${TEST_TARGET}"
