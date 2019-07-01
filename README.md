# Sauti Marketplace

A Database API that helps users navigate and search for goods they need around their area. This API is communcating with
a third party technology called USSD to help users navigate with the API. **USSD** is Unstructured Supplementary Service Data. 
Informal cross-border trade is a major feature of African economies: it creates jobs, contributes to food and energy security, and alleviates poverty. However many traders are unaware of their rights, required customs procedures and documentation, making them vulnerable to corruption and harassment.
With this API we will be able to let users have a friendly safe user environment without having any issues with the products
they are trying to buy. 

### Prerequisite 

The reason behind this application is to help buyers find resources they need before they travel, cross borders, or 
get scammed from false prices from sellers. It's highly essential for women since women are highly victims of having bad 
experience with marketplaces. Sauti provides mobile-based tools and platforms for simplifying access to information on trading procedures, and market information.

### How are we doing this? 

We are working with a stakeholder that already has an existing app that is being used in the real world, but the stakeholder 
**believes** that there is a better solution to do this. And that is where we come in! We are creating a full Menu for users 
to access right through their mobile device via using text messages with the help of USSD that is basically the provider 
for Marketplaces. With this we can come up with a way to simplify the user experience.

## Contributing

We are no experts here and are open to any type of contribution! If you feel like you have some crazy solutions to help us
make this software better and more simple, feel free to fork this repo and code away! 

*Inspiring words from* **Elon Musk** himself, **Don't do it** 

## Versioning 

NodeJs / Express / USSD / Postgres - for more specifications please check our `package.json` file 

The webrouter.js is a backend API that can be used to build a front end application with functional end points. 

## API URL

https://sauti-marketplace.herokuapp.com/


| Method | Endpoint                                    | Access Control | Description                                  |
| ------ | --------------------------------------------| -------------- | -------------------------------------------- |
| GET | 

`//sauti-marketplace.herokuapp.com/categories` | all categories      | Returns the information for categories. |

`//sauti-marketplace.herokuapp.com/markets` | all markets      | Returns the information for markets. |

`//sauti-marketplace.herokuapp.com/countries` | all countries      | Returns the information for countries. |

`//sauti-marketplace.herokuapp.com/sessions` | all sessions      | Returns the information for sessions. |

`//sauti-marketplace.herokuapp.com/country/:id` | all country/:id      | Returns the information for country/:id. |

`//sauti-marketplace.herokuapp.com/products/:id` | all products/:id      | Returns the information for products/:id. |

| POST |

`//sauti-marketplace.herokuapp.com/addmarket` | 
| Added a new marketplace. |

`//sauti-marketplace.herokuapp.com/addcountry` | 
| Added a new country. |

`//sauti-marketplace.herokuapp.com/addsessions` | 
| Added a new session. |

`//sauti-marketplace.herokuapp.com/addcategories` | 
| Added a new category. |

| Delete |

`//sauti-marketplace.herokuapp.com/deletemarket/:id` | 
| Delete a marketplace. |

`//sauti-marketplace.herokuapp.com/deletecountry/:id` | 
| Delete a country. |

`//sauti-marketplace.herokuapp.com/deletesession/:id` | 
| Delete a session. |

| Update |

`//sauti-marketplace.herokuapp.com/updatecountry/:id` | 
| update a country. |

`//sauti-marketplace.herokuapp.com/updatesession/:id` | 
| update a session. |





## Authors 

*Cameron MacDonald* 

*Jen Dority* 

*Steven Jefferson* 

*Sarah Riley* 

*Oscar Ortiz* 

*Wei Du*



