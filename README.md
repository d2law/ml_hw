# ml_hw
APIs to implement
• /sales/record (post)
To receive the data in CSV format.
Data validation is mandatory.
Sample: http://127.0.0.1/sales/report
body {
uploadFile : file.csv
}

• /sales/report (get)
To query data with JSON format response.
User should be able to query with date inputs (single date or date range).

Sample, single date query: http://127.0.0.1/sales/report?date=2020-08-03 
Sample, date range query: http://127.0.0.1/sales/report?start_date=2020-08-03&end_date=2020-08-20


The assignment is based on nodejs with express as middleware
It uses mongodb as data storage.
