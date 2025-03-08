<!-- markdownlint-disable -->
# About

[![ETL Flight Data](https://github.com/bradfordjohnson/kchs/actions/workflows/etl-flight-data.yaml/badge.svg)](https://github.com/bradfordjohnson/kchs/actions/workflows/etl-flight-data.yaml)
[![Deploy dashboard to Pages](https://github.com/bradfordjohnson/kchs/actions/workflows/dashboard-deploy.yml/badge.svg)](https://github.com/bradfordjohnson/kchs/actions/workflows/dashboard-deploy.yml)

Built with Observable Framework, this dashboard provides a dynamic, data-driven view of Charleston International Airport (KCHS) flight activity. It combines JavaScript-powered visuals, data mapping and fetching with a Python-based ETL pipeline that collects daily flight snapshots for historical views.

## Features

- Daily flight metrics and trends for arrivals and departures
  - WoW delta comparisons
- Arrivals and departures "boards", showing flights, statuses, and more.

### Features in development

- Live gate map – a Leaflet-based gate map with SVG plane overlays to track & visualize real-time in-gate performance
- Main interactive dashboard page with historical and live data
  - dimensional filters, metric performance and trends

### TODO

- Create data model and logic to determine what flights are in the gate at a given time
