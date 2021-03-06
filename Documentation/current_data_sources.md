# Current Data Sources

This document outlines the data currently being made available to the Dashboard in each city. 

## Greenwich USP

Greenwich's USP is currently the London City Data Store. This is a service that enables sharing of data between Local Authorities and also between Local Authorities and the Public. The platform currently provides API access to a number of datasources using the ArcGIS [REST API](https://developers.arcgis.com/rest/).

Access to this service requires:

 1. An account with the London City Data Store (enabled by Greenwich)
 2. The creation of a [Token](https://maps.london.gov.uk/gla/tokens/generateToken) which will create something like:

 ```
 {
  "token": "randomtokenstringxyz123",
  "expires": 1538818295989
}
```

### Other non-USP data in Greenwich

None at time of writing. 

## Lisbon USP

Lisbon's USP is built and maintained by [AlticeLabs](http://www.alticelabs.com/en/) and is based on their smartIoT platform.

This platform provides the following APIs: 

-	Admin/Account API (private) – to create accounts and other internal management functions – currently to create an account you must __contact__ [Altice Labs] (https://iot.alticelabs.com/contact/)  
-	[Authentication API](https://iot.alticelabs.com/docs/authentication/intro/) – to authenticate using credentials, meaning to retrieve access tokens based on both the `account_id` and `account_secret` provided by the platform administrator.
-	[Authorization API](https://iot.alticelabs.com/docs/authorization/authorization/) – to define access control rules related to account operations (e.g. devices) and access rights to write and read information to and from streams.
-	[Device Management API](https://iot.alticelabs.com/docs/devices/devices/) – To manage your devices and streams, meaning to create, update, get and delete devices (e.g. sensors, gateways, buildings, counters, etc.) and streams (e.g. temperature, consumed energy, traveled kilometers)
-	[Subscription API](https://iot.alticelabs.com/docs/data-comunication/subscriptions/) – To manage subscriptions to be able to publish and receive data.


Currently, basic access to this service requires:

 1. An account with the SmartIoT platform (enabled by AlticeLabs)
 2. The creation of a [Token](https://iot.alticelabs.com/docs/authentication/intro/) which will create something like:
 
 ```skr5h56kd8rwids4c6e9du0ohdf83ng08d2pdug44omt9bt3st9q4t```

### Other non-USP data in Lisbon

None at time of writing. 

## Milan USP

Milan's USP is built on-top of the city of Milan's [API Store](https://apisp.comune.milano.it/store/). This is a store for access to data from a range of city initiatives. 

Access to this service requires:

 1. An account with the Milan API store (approved by City of Milan).
 	1. Creation of an application (approved by City of Milan). An application is a logical representation of the application you are creating used to provide access to all the APIs used by your application with the same credentials.
 	2. Once your application has been accepted, you must subscribe to an API (approved by City of Milan)
 	3. You can now generate `production` and `sandbox` keys to access the API using the oAuth2 protocol. Every application can access all the APIs subscribed with a single authentication credential.
 	4. This will create an `Access token`, `Consumer keys` and a `Consumer Secret`.
 	5. You can set a token that never expires but this is adviced only for temporary development uses. However, Once deployed, your application should get the access token by calling the alternative [REST endpoint](https://api.comune.milano.it/token).

### Other non-USP data in Milan

None at time of writing. 

To add: http://www.e015.regione.lombardia.it/site/api-catalog 