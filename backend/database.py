# Database setup and connections
import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

TOKEN = "PgvJyudPK0Y8z4-dHuWVzQvwz9lDWqeXoxl4Uno_8IEcNHTDd9CdjusrtxpMv333Wo8KlMJ-5uMKuTF5DpODmA=="
ORG = "terra"
URL = "http://localhost:8086"

write_client = InfluxDBClient(url=URL, token=TOKEN, org=ORG)

bucket="terra"

write_api = write_client.write_api(write_options=SYNCHRONOUS)
   
for value in range(5):
  point = (
    Point("measurement1")
    .tag("tagname1", "tagvalue1")
    .field("field1", value)
  )
  write_api.write(bucket=bucket, org="terra", record=point)
  time.sleep(1) # separate points by 1 second

