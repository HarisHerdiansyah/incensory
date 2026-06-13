Incensory is PKMK Team in 2025 that combine frankincense perfume with virtual reality content. 

Web Application for PKMK Funding Event in 2025. This web is for information media and admin dashboard. This app contain two roles, customer and admin. Customer can register by fulfill credential and access code. Access code itself is a unique code that gather from buying product. Every purchases gave one access code so user can register. Access code is used for keep exclusitivy of the product of virtual reality content. Virtual reality content only can be accessed from customer that already buy product

## Role
### Customer
Customer can access after register with access code. Customer can see product and redirect to marketplace. Also, customer can access content VR that can be accessed in different domain with access token.

### Admin
Admin can access CMS for see users data via UI and manage data product

## Database`
- `users`: store users data that contain username and credentials
- `access_code`: store access code of the product that related to registered user and have `is_used` flag for tag if the code is already used by registered user
- `user_ratings`: to store user comment and rating of the product
- `products`: store product data, and related to `product_links` and `product_images`
- `product_links`: store link of product from marketplace
- `product_images`: store product image directory / path in S3 (Cloudflare S2)

## Deployment Workflow
this project is segmented into two different branch, for production we use `main` branch and development / staging we use `dev` branch, every branch is hosted into different serverless service, AWS Amplify and Vercel

## Domain Management
This project use four domain, each domain have different purpose. `incensory.id` as name for production app, `stg.incensory.id` for staging app, `media.incensory.app` for media url such as images that hosted in Cloudlfare R2 and use CDN. `vr.incensory.id` for host WebXR / VR Content app that developed with Unity WebXR.

## Architecture
Frontend communicate to backend with two different method, via API and Next.js server action. API is used to external service to such as object storage and next js auth. Server action is used for data management.

Frontend don't request URL directly, instead, use presigned url then return media url