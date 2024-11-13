# 🌐 Mini URL API

Mini URL API is a simple service to shorten URLs. Send a URL and receive a shortened version in response.

## 🚀 Endpoints

### Shorten URL

**URL**: `/shorturl`  
**Method**: `POST`  
**Description**: This endpoint shortens the URL provided in the request body.

#### 📥 Request

Send a `POST` request to `/shorturl` with the following body:

```json
{
  "url": "https://your-desired-url.com"
}
