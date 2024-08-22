# Error as Values Fetch (EAVFetch)

A Go-inspired approach to handling fetch API in TypeScript/JavaScript.

---

### Installation 📦

just copy the `eavfetch.ts/js` in the repo

---

### API Structure should be as follows:

#### HTTP Success ✅

- Type: `JSON`
- Structure: `{ data: T }`

#### HTTP Error ❌

- Type: `string`
- Content: `Error message`

**or you can modify the code to fit your API structure, it's not that hard. 😉**

---

### Basic Usage 🚀

```typescript
import { get } from "./eavfetch";

interface Book {
  id: string;
  title: string;
  author: string;
}

async function fetchBooks() {
  // data type is inferred as Book[]
  const [data, error] = await get<Book[]>("/books");

  if (error) {
    console.error("Failed to fetch books:", error);
    return;
  }

  if (data) {
    console.log("Fetched books:", data);
  }
}
```
