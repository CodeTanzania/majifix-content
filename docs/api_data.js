define({ "api": [
  {
    "type": "delete",
    "url": "/contents/:id",
    "title": "Delete Existing Content",
    "version": "1.0.0",
    "name": "DeleteContent",
    "group": "Content",
    "description": "<p>Delete existing content</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-content.herokuapp.com/v1/contents/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique content identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this content belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "type",
            "description": "<p>Content type i.e FAQ, Tariff etc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type.en",
            "description": "<p>Content type in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "title",
            "description": "<p>Content title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title.en",
            "description": "<p>Content title in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Content body</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "body.en",
            "description": "<p>Content body in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "publishedAt",
            "description": "<p>Date when content was published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when content was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when content was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5ae8266ad56112713720f072\",\n  \"jurisdiction\": {\n    \"_id\": \"5af3218b28d3615ed0f551d3\",\n    \"color\": \"#A72ED3\",\n    \"code\": \"08588014\",\n    \"name\": \"Guatemala\"\n  },\n  \"type\":\n  {\n    \"en\": \"FAQ\",\n    \"sw\": \"FAQ\"\n  },\n  \"title\":\n  {\n    \"en\": \"Laborum molestiae et modi qui officiis voluptates et.\",\n    \"sw\": \"Odio nisi delectus qui excepturi voluptate in incidunt.\"\n  },\n  \"body\":\n  {\n    \"en\": \"Sed ut velit quia. Enim sed labore facilis asperiores quia.\",\n    \"sw\": \"Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor.\"\n  },\n  \"publishedAt\": \"2018-05-01T08:33:45.505Z\",\n  \"createdAt\": \"2018-05-01T08:33:46.032Z\",\n  \"updatedAt\": \"2018-05-01T08:33:46.032Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/contents/:id",
    "title": "Get Existing Content",
    "version": "1.0.0",
    "name": "GetContent",
    "group": "Content",
    "description": "<p>Get existing content</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-content.herokuapp.com/v1/contents/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique content identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this content belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "type",
            "description": "<p>Content type i.e FAQ, Tariff etc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type.en",
            "description": "<p>Content type in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "title",
            "description": "<p>Content title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title.en",
            "description": "<p>Content title in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Content body</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "body.en",
            "description": "<p>Content body in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "publishedAt",
            "description": "<p>Date when content was published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when content was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when content was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5ae8266ad56112713720f072\",\n  \"jurisdiction\": {\n    \"_id\": \"5af3218b28d3615ed0f551d3\",\n    \"color\": \"#A72ED3\",\n    \"code\": \"08588014\",\n    \"name\": \"Guatemala\"\n  },\n  \"type\":\n  {\n    \"en\": \"FAQ\",\n    \"sw\": \"FAQ\"\n  },\n  \"title\":\n  {\n    \"en\": \"Laborum molestiae et modi qui officiis voluptates et.\",\n    \"sw\": \"Odio nisi delectus qui excepturi voluptate in incidunt.\"\n  },\n  \"body\":\n  {\n    \"en\": \"Sed ut velit quia. Enim sed labore facilis asperiores quia.\",\n    \"sw\": \"Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor.\"\n  },\n  \"publishedAt\": \"2018-05-01T08:33:45.505Z\",\n  \"createdAt\": \"2018-05-01T08:33:46.032Z\",\n  \"updatedAt\": \"2018-05-01T08:33:46.032Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/contents",
    "title": "List Contents",
    "version": "1.0.0",
    "name": "GetContents",
    "group": "Content",
    "description": "<p>Returns a list of contents</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-content.herokuapp.com/v1/contents"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of contents</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique content identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this content belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.type",
            "description": "<p>Content type i.e FAQ, Tariff etc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.type.en",
            "description": "<p>Content type in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.title",
            "description": "<p>Content title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.title.en",
            "description": "<p>Content title in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.body",
            "description": "<p>Content body</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.body.en",
            "description": "<p>Content body in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.publishedAt",
            "description": "<p>Date when content was published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when content was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when content was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of client</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of client returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest content was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"data\": [{\n       \"_id\": \"5ae8266ad56112713720f072\",\n       \"jurisdiction\": {\n         \"_id\": \"5af3218b28d3615ed0f551d3\",\n         \"code\": \"08588014\",\n         \"name\": \"Guatemala\"\n       },\n       \"type\":\n       {\n         \"en\": \"FAQ\",\n         \"sw\": \"FAQ\"\n       },\n       \"title\":\n       {\n         \"en\": \"Laborum molestiae et modi qui officiis voluptates et.\",\n         \"sw\": \"Odio nisi delectus qui excepturi voluptate in incidunt.\"\n       },\n       \"body\":\n       {\n         \"en\": \"Sed ut velit quia. Enim sed labore facilis asperiores quia.\",\n         \"sw\": \"Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor.\"\n       },\n       \"publishedAt\": \"2018-05-01T08:33:45.505Z\",\n       \"createdAt\": \"2018-05-01T08:33:46.032Z\",\n       \"updatedAt\": \"2018-05-01T08:33:46.032Z\"\n    }],\n    \"total\": 10,\n    \"size\": 1,\n    \"limit\": 1,\n    \"skip\": 0,\n    \"page\": 1,\n    \"pages\": 10,\n    \"lastModified\": \"Mon, 30 Apr 2018 12:33:58 GMT\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/jurisdictions/:jurisdiction/contents",
    "title": "List Jurisdiction Contents",
    "version": "1.0.0",
    "name": "GetJurisdictionContents",
    "group": "Content",
    "description": "<p>Returns a list of specified jurisdiction contents</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-content.herokuapp.com/v1/jurisdictions/:jurisdiction/contents"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of contents</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique content identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this content belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.type",
            "description": "<p>Content type i.e FAQ, Tariff etc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.type.en",
            "description": "<p>Content type in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.title",
            "description": "<p>Content title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.title.en",
            "description": "<p>Content title in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.body",
            "description": "<p>Content body</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.body.en",
            "description": "<p>Content body in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.publishedAt",
            "description": "<p>Date when content was published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when content was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when content was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of client</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of client returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest content was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"data\": [{\n       \"_id\": \"5ae8266ad56112713720f072\",\n       \"jurisdiction\": {\n         \"_id\": \"5af3218b28d3615ed0f551d3\",\n         \"code\": \"08588014\",\n         \"name\": \"Guatemala\"\n       },\n       \"type\":\n       {\n         \"en\": \"FAQ\",\n         \"sw\": \"FAQ\"\n       },\n       \"title\":\n       {\n         \"en\": \"Laborum molestiae et modi qui officiis voluptates et.\",\n         \"sw\": \"Odio nisi delectus qui excepturi voluptate in incidunt.\"\n       },\n       \"body\":\n       {\n         \"en\": \"Sed ut velit quia. Enim sed labore facilis asperiores quia.\",\n         \"sw\": \"Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor.\"\n       },\n       \"publishedAt\": \"2018-05-01T08:33:45.505Z\",\n       \"createdAt\": \"2018-05-01T08:33:46.032Z\",\n       \"updatedAt\": \"2018-05-01T08:33:46.032Z\"\n    }],\n    \"total\": 10,\n    \"size\": 1,\n    \"limit\": 1,\n    \"skip\": 0,\n    \"page\": 1,\n    \"pages\": 10,\n    \"lastModified\": \"Mon, 30 Apr 2018 12:33:58 GMT\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/contents/:id",
    "title": "Patch Existing Content",
    "version": "1.0.0",
    "name": "PatchContent",
    "group": "Content",
    "description": "<p>Patch existing content</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-content.herokuapp.com/v1/contents/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique content identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this content belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "type",
            "description": "<p>Content type i.e FAQ, Tariff etc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type.en",
            "description": "<p>Content type in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "title",
            "description": "<p>Content title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title.en",
            "description": "<p>Content title in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Content body</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "body.en",
            "description": "<p>Content body in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "publishedAt",
            "description": "<p>Date when content was published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when content was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when content was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5ae8266ad56112713720f072\",\n  \"jurisdiction\": {\n    \"_id\": \"5af3218b28d3615ed0f551d3\",\n    \"color\": \"#A72ED3\",\n    \"code\": \"08588014\",\n    \"name\": \"Guatemala\"\n  },\n  \"type\":\n  {\n    \"en\": \"FAQ\",\n    \"sw\": \"FAQ\"\n  },\n  \"title\":\n  {\n    \"en\": \"Laborum molestiae et modi qui officiis voluptates et.\",\n    \"sw\": \"Odio nisi delectus qui excepturi voluptate in incidunt.\"\n  },\n  \"body\":\n  {\n    \"en\": \"Sed ut velit quia. Enim sed labore facilis asperiores quia.\",\n    \"sw\": \"Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor.\"\n  },\n  \"publishedAt\": \"2018-05-01T08:33:45.505Z\",\n  \"createdAt\": \"2018-05-01T08:33:46.032Z\",\n  \"updatedAt\": \"2018-05-01T08:33:46.032Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/contents",
    "title": "Create New Content",
    "version": "1.0.0",
    "name": "PostContent",
    "group": "Content",
    "description": "<p>Create new content</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-content.herokuapp.com/v1/contents"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique content identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this content belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "type",
            "description": "<p>Content type i.e FAQ, Tariff etc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type.en",
            "description": "<p>Content type in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "title",
            "description": "<p>Content title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title.en",
            "description": "<p>Content title in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Content body</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "body.en",
            "description": "<p>Content body in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "publishedAt",
            "description": "<p>Date when content was published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when content was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when content was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5ae8266ad56112713720f072\",\n  \"jurisdiction\": {\n    \"_id\": \"5af3218b28d3615ed0f551d3\",\n    \"color\": \"#A72ED3\",\n    \"code\": \"08588014\",\n    \"name\": \"Guatemala\"\n  },\n  \"type\":\n  {\n    \"en\": \"FAQ\",\n    \"sw\": \"FAQ\"\n  },\n  \"title\":\n  {\n    \"en\": \"Laborum molestiae et modi qui officiis voluptates et.\",\n    \"sw\": \"Odio nisi delectus qui excepturi voluptate in incidunt.\"\n  },\n  \"body\":\n  {\n    \"en\": \"Sed ut velit quia. Enim sed labore facilis asperiores quia.\",\n    \"sw\": \"Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor.\"\n  },\n  \"publishedAt\": \"2018-05-01T08:33:45.505Z\",\n  \"createdAt\": \"2018-05-01T08:33:46.032Z\",\n  \"updatedAt\": \"2018-05-01T08:33:46.032Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/contents/:id",
    "title": "Put Existing Content",
    "version": "1.0.0",
    "name": "PutContent",
    "group": "Content",
    "description": "<p>Put existing content</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-content.herokuapp.com/v1/contents/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique content identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this content belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "type",
            "description": "<p>Content type i.e FAQ, Tariff etc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type.en",
            "description": "<p>Content type in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "title",
            "description": "<p>Content title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title.en",
            "description": "<p>Content title in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>Content body</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "body.en",
            "description": "<p>Content body in english</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "publishedAt",
            "description": "<p>Date when content was published</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when content was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when content was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5ae8266ad56112713720f072\",\n  \"jurisdiction\": {\n    \"_id\": \"5af3218b28d3615ed0f551d3\",\n    \"color\": \"#A72ED3\",\n    \"code\": \"08588014\",\n    \"name\": \"Guatemala\"\n  },\n  \"type\":\n  {\n    \"en\": \"FAQ\",\n    \"sw\": \"FAQ\"\n  },\n  \"title\":\n  {\n    \"en\": \"Laborum molestiae et modi qui officiis voluptates et.\",\n    \"sw\": \"Odio nisi delectus qui excepturi voluptate in incidunt.\"\n  },\n  \"body\":\n  {\n    \"en\": \"Sed ut velit quia. Enim sed labore facilis asperiores quia.\",\n    \"sw\": \"Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor.\"\n  },\n  \"publishedAt\": \"2018-05-01T08:33:45.505Z\",\n  \"createdAt\": \"2018-05-01T08:33:46.032Z\",\n  \"updatedAt\": \"2018-05-01T08:33:46.032Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });
