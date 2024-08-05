# sveltekit-pocketbase-starter

This is a personal project template for SvelteKit with PocketBase. (A personal favorite for quick side projects)

## Get started

First, download the pocketbase executable from the [releases page](https://pocketbase.io/docs/) in the backend directory

```bash
cd backend
wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.18/pocketbase_0.22.18_darwin_arm64.zip
unzip pocketbase_0.22.18_darwin_arm64.zip
./pocketbase serve
```

Then, install the dependencies for the client

```bash
cd client
yarn install
```

Next, create a .env in the client directory from the `.sample.env` file

```bash
cp .sample.env .env
```

Finally, start the client

```bash
yarn dev
```
