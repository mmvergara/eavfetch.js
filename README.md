# Error as Values Fetch (EAVFetch)

A Go-inspired approach to handling fetch API in TypeScript/JavaScript.

### Installation 📦

just copy the `eavfetch.ts/js` in the repo


### API Structure should be as follows:

#### HTTP Response format
the server should always return the same format regardless if the request is success or not

- Type: `JSON`
- Structure: `{ data: T, error:string }`

**or you can modify the code to fit your API structure, it's not that hard. 😉**


### Basic Usage 🚀

```typescript
import { api } from "./eavfetch";

interface Book {
  id: string;
  title: string;
  author: string;
}

async function fetchBooks() {
  // data type is inferred as Book[]
  const [data, error] = await api.get<Book[]>("/books");

  if (error) {
    console.error("Failed to fetch books:", error);
    return;
  }

  if (data) {
    console.log("Fetched books:", data);
  }
}
```
