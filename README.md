# Stacked Modals with Bar Chart

This project is a take-home challenge to recreate stacked modals similar to the animation seen [here](https://x.com/emilkowalski_/status/1793339341311201556) using **Next.js 14 (app router)**, **Tailwind CSS**, **Shadcn + Recharts**, and **Framer Motion**.

## Deployment

The application is deployed and accessible at: [Deployed App Link](https://clarum-assignment.vercel.app/)

## Features

- **Base Page**: Displays a bar chart (using Shadcn charts, which leverages Recharts) and a "View Numbers" button.
- **First Modal**: Opens upon clicking "View Numbers", showing a list of numbers, with "Add Number" and "Cancel" buttons.
- **Second Modal**: Triggered by clicking "Add Number", allows number input with an "Apply" button to add numbers to the bar chart.
- **Seamless Navigation**: Users can navigate between the base page, first, and second modals using intuitive "Cancel" and "Apply" buttons or by clicking outside the modals.

## Tech Stack

- **Next.js 14 (App Router)**: Framework for the application.
- **Tailwind CSS**: For utility-first styling.
- **Shadcn + Recharts**: Used for rendering bar charts.
- **Framer Motion**: Powers the smooth animations for stacked modal transitions.
