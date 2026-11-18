# Installing entity type packages

Install a package to make all its entity types available in the workspace. You can select a package from an **entity type marketplace**, a Git repository that hosts packages, or install it directly using the Git repository URL and the path to the package within it.

## Package dependencies

When a type in one package uses a type from another package, the second package is a dependency of the first. Speca automatically installs a package’s dependencies when you install it.

A local package can depend on other local packages and on packages installed from Git repositories. You can install a remote package only if all its dependencies, including indirect dependencies, are in the same repository.
