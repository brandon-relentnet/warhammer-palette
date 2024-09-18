#!/bin/bash

# File paths
new_file="updated_warhammer_paints.json"
current_file="current_database.json"
output_file="merged_database.json"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is required but not installed. Please install jq."
    exit 1
fi

# Ensure both files exist
if [ ! -f "$new_file" ] || [ ! -f "$current_file" ]; then
    echo "One of the files is missing!"
    exit 1
fi

# Merge logic to update hexCodes in the current database where names match and retain all other data
jq --slurpfile new_data "$new_file" '
    map(
        .name as $current_name |
        # Check if a matching entry exists in the new data
        ($new_data[] | select(.name == $current_name)) as $new_entry |

        # If a matching entry exists and current hexCode is "Unable to process", update it
        if $new_entry and .hexCode == "Unable to process" then
            .hexCode = $new_entry.hexCode
        else
            .
        end
    )
' "$current_file" > "$output_file"

# Check if the merge was successful
if [ $? -eq 0 ]; then
    echo "Merge complete! Merged data saved to $output_file."
else
    echo "Merge failed."
fi
