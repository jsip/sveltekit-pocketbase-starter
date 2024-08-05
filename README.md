# sveltekit-pocketbase-starter

This is a personal project template for SvelteKit with PocketBase. (A personal favorite for quick side projects)

## Get started

First, navigate to the backend directory

```bash
cd backend
```

Then, download the pocketbase executable from the [releases page](https://pocketbase.io/docs/)

```bash
wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.18/pocketbase_0.22.18_darwin_arm64.zip
unzip pocketbase_0.22.18_darwin_arm64.zip
rm pocketbase_0.22.18_darwin_arm64.zip
./pocketbase serve
```

Then, navigate to the client directory

```bash
cd client
```

Install the dependencies

```bash
yarn install
```

Next, create a .env from the `.sample.env` file

```bash
cp .sample.env .env
```

Finally, start the client

```bash
yarn dev
```
