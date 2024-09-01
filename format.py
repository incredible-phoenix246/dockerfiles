#!/usr/bin/python3

import csv

# Input and output file paths
input_file = 'cadet_bio.csv'
output_file = 'details.csv'

# Function to combine fname and sname into a single name field and set npa_no as password


def process_csv(input_file, output_file):
    with open(input_file, 'r') as infile:
        reader = csv.DictReader(infile)
        fieldnames = ['name', 'password']

        with open(output_file, 'w', newline='') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()

            for row in reader:
                # Combine fname and sname into name
                name = f"{row['fname']} {row['sname']}"
                # Set npa_no as password
                password = row['npa_no']

                # Write the processed row with only name and password fields
                writer.writerow({'name': name, 'password': password})


# Call the function to process the CSV file
process_csv(input_file, output_file)
