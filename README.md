Clone the git

yarn install 

yarn start

in your manifest.lkml

```
application: flights {
    url: "http://localhost:8080/bundle.js"
    label: "Flights Example"
}
```

Update the mapbox token [here](./src/components/Map/MapEntry.tsx#L7)
