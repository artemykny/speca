# Product examples

## Migrate a feature directory to a custom entity

```text
Before                      After
features (Directory)        features (Features)
└── login (Directory)       └── login (Feature)
    └── spec.md (File)
```

Speca cannot change an existing entity’s type. A temporary name lets you create the new collection alongside the original and migrate the login specification before reusing its path.

1. Define a `Feature` entity type and a `Features` entity type that accepts `Feature` children.
2. Create an entity named `features_tmp` of type `Features` alongside `features/`.
3. Create a child named `login` of type `Feature` under `features_tmp`.
4. Use the information in `features/login/spec.md` to populate the new `login` entity’s fields.
5. Delete the original `features` entity, then rename `features_tmp` to `features`.
6. Commit the type definitions and the migration together in one Git commit.
