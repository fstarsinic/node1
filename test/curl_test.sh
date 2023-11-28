#!/bin/bash

# Specify the file containing URLs
URL_FILE="curl_list"

# Loop through each line in the file
while IFS= read -r url; do
  echo "Testing URL: $url"
  # Run your curl command here
  curl "$url"
  echo ""
  echo "-------------------------------------"
done < "$URL_FILE"

