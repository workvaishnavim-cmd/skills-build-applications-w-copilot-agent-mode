# Octofit Tracker presentation tier

The React app uses Vite and React Router. It requests data from the API on port
8000.

## API URL configuration

In Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` using the value of
your Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite only exposes environment variables prefixed with `VITE_` to browser code.
Restart the Vite development server after changing `.env.local`. The app builds
its API URL as `https://${VITE_CODESPACE_NAME}-8000.app.github.dev`.

For local development outside Codespaces, leave `VITE_CODESPACE_NAME` unset;
the app safely falls back to `http://localhost:8000`.
