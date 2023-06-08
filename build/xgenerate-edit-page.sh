#!/bin/bash

# The business slug is the first argument to the script
BUSINESS_SLUG=$1

# The input file is named after the business slug
INPUT_FILE="data/items-$BUSINESS_SLUG.txt"

# The output file will be in the src directory, named after the business slug
OUTPUT_FILE="src/$BUSINESS_SLUG/edit.html"

# The start of the HTML file, up to where the items go
HTML_START='<!DOCTYPE html>
<html>
  <head>
    <title>Inventory Management</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f0f0f0;
      }
      h1 {
        color: #333;
        font-size: 2em;
      }
      form, table {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      table, th, td {
        border: 1px solid #ddd;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Manage Inventory</h1>

    <!-- Form for adding new items -->
    <form id="addPromoForm">
      <h2>Add Promotion</h2>
      <label for="promoName">Promotion Name:</label>
      <input type="text" id="promoName" name="promoName" required>
      <label for="promoDescription">Promotion Description:</label>
      <input type="text" id="promoDescription" name="promoDescription" required>
      <label for="donationPrice">Donation Price:</label>
      <input type="number" id="donationPrice" name="donationPrice" step="0.01" required>
      <label for="purchasePrice">Purchase Price:</label>
      <input type="number" id="purchasePrice" name="purchasePrice" step="0.01" required>
      <label for="inventory">Initial Inventory:</label>
      <input type="number" id="inventory" name="inventory" step="1" required>
      <input type="submit" value="Add Promotion">
    </form>

    <!-- Table for displaying existing items -->
    <h2>Existing Promotions</h2>
    <table id="promoTable">
      <thead>
        <tr>
          <th>Promotion Name</th>
          <th>Promotion Description</th>
          <th>Donation Price</th>
          <th>Purchase Price</th>
          <th>Inventory</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>'

# Write the start of the HTML to the output file
echo "$HTML_START" > $OUTPUT_FILE

# Read the input file line by line
while IFS= read -r line
do
  # Split the line into the promo name, description, donation price, purchase price, and inventory using awk
  PROMO=$(echo $line | awk -F'"' '{print $1}')
  DESCRIPTION=$(echo $line | awk -F'"' '{gsub(/ /, "", $2); print $2}')
  DONATION_PRICE=$(echo $line | awk '{print $(NF-2)}')
  PURCHASE_PRICE=$(echo $line | awk '{print $(NF-1)}')
  INVENTORY=$(echo $line | awk '{print $NF}')

  # Create the HTML for the promo, adding a $ sign before the prices
  PROMO_HTML="<tr><td><input type=\"text\" value=\"$PROMO\" class=\"promo-input\"></td><td><input type=\"text\" value=\"$DESCRIPTION\" class=\"promo-input\"></td><td><input type=\"number\" value=\"$DONATION_PRICE\" class=\"promo-input\"></td><td><input type=\"number\" value=\"$PURCHASE_PRICE\" class=\"promo-input\"></td><td><input type=\"number\" value=\"$INVENTORY\" class=\"promo-input\"></td><td><!-- Action buttons --></td></tr>"

  # Write the promo HTML to the output file
  echo "$PROMO_HTML" >> $OUTPUT_FILE

done < $INPUT_FILE

# The end of the HTML file, after the items
HTML_END='      </tbody>
    </table>
  </body>
</html>'

# Write the end of the HTML to the output file
echo "$HTML_END" >> $OUTPUT_FILE
