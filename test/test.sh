#!/usr/bin/env bash

cd $(dirname "$0")

pandoc --version &> /dev/null \
  || (echo "Pandoc must be installed to run tests" && exit 0)

pandoc -o test.docx -F ../bin/docx-header-num.js test.md \
  || (echo "FAIL: header numbers" && exit 1)

open -W test.docx
rm -f *.docx

