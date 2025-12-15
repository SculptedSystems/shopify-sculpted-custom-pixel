# Shopify Sculpted Custom Pixel

## Background

### Purpose

This project provides a Custom Pixel for tracking Shopify's Customer Events.

The Pixel captures store events in the browser and sends them to Google Tag Manager (GTM).

The Pixel enables Shopify stores to push customer interaction data like:

- product views
- cart updates
- purchases

into GTM for analytics and advertising workflows.

### Context

- The pixel runs within the Shopify storefront.
- It executes in the user’s browser.
- It pushes event data to GTM’s `dataLayer`.

## Installation

### Theme

#### Prepare

- navigate to your Google Tag Manager web container or Stape installation code
- copy the code

#### Embed

- navigate to [admin.shopify.com](https://admin.shopify.com)
- navigate to "Sales Channels" > "Online Store" > "Themes"
- click "Edit theme"
- navigate to "Edit code"
- open "layout" > "theme.liquid"
- paste your web container installation code directly under `<head>`
- copy and paste the following code directly under the web container code

```html
    <!--- Begin Sculpted Pixel --->
    <script>
      window.dataLayer = window.dataLayer || [];
  
      window.addEventListener("message", (event) => {
        if (event.data?.event) {
         window.dataLayer.push(event.data);
        }
      });
    </script>
    <!--- End Sculpted Pixel --->
```

### Customer Events

#### Set Up

- run `git clone https://github.com/SculptedSystems/shopify-sculpted-custom-pixel`
- run `cd shopify-sculpted-custom-pixel`
- run `npm install`

#### Configure

- copy `.env.example` to `.env`
- edit `.env` to fit your needs

#### Compile

- run `npm run build`
- copy the code from `dist/index.js`

#### Publish

- navigate to [admin.shopify.com](https://admin.shopify.com)
- navigate to "Settings"
- navigate to "Customer events" in your store
- click "Add custom pixel"
- name it
- set "Permission" to "Not required"
- set "Data sale" to "Data collected does not qualify as data sale"
- paste the code in "Code"
- update the configuration
- click "save" at the top of the page
- click "Connect"
