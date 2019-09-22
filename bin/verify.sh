#!/usr/bin/env bash

set -eux

export PATH=./node_modules/.bin:$PATH
export NODE_PATH=.
readonly TARGET=recursion
readonly SOURCE_TARGET=$(ls dstructure/*.ts algorithm/*.ts | grep -v '.test.' | grep "${TARGET}")
readonly TEST_TARGET=$(ls dstructure/*.test.ts algorithm/*.test.ts | grep "${TARGET}")

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
    tsc
}

function verify {
    local target=${1?ERROR: mandatory target is not provided}

    jest ${target//.ts/.js}
}

format "${SOURCE_TARGET}"
validate "${SOURCE_TARGET}"
compile

format "${TEST_TARGET}"
validate "${TEST_TARGET}"
verify "${TEST_TARGET}"
