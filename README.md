# How to convert plain `.js` files into typed `.js` files using TypeScript and JSDocs

## Step 1
Turn your project directory into a Node.js project: `npm init` then follow the prompts.

## Step 2
Install TypeScript: `npm install --save-dev typescript`

## Step 3
Create a `tsconfig.json` file in the root of your project and add these configs:

```json
{
  "compilerOptions": {
    "strict": true,
    "allowJs": true,
    "checkJs": true,
    "resolveJsonModule": true,
    "noEmitOnError": true,
    "moduleResolution": "node",
		"module": "es2020",
		"lib": ["es2020", "DOM"],
    "target": "es6",
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

The descriptions of these options can be found here: https://www.typescriptlang.org/tsconfig

* `compilerOptions`: These options make up the bulk of TypeScript’s configuration and it covers how the language should work.
    * `strict`: The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning this on is equivalent to enabling all of the strict mode family options, which are outlined below. You can then turn off individual strict mode family checks as needed.
    * `allowJs`: Allow JavaScript files to be imported inside your project, instead of just `.ts` and `.tsx` files. 
        * NOTE: This option is required in order to use JSDocs to provide type checking in your `.js` files. If you don't add this option, then the build process will ignore your `.js` files, which is not what you want.
    * `checkJs`: Works in tandem with `allowJs`. When `checkJs` is enabled then errors are reported in JavaScript files (but only during the build process). This is the equivalent of including `// @ts-check` at the top of all JavaScript files which are included in your project.
        * NOTE: If you have the `checkJs: true` option set in `tsconfig.json`, then VSCode should show type checking errors as you type them. If you do not see type checking errors, try closing out all VSCode windows that you have open and reopening them. That should enable your `tsconfig.json` settings and you should be able to see type checking errors in your `.js` files.
    * `resolveJsonModule`: Allows importing modules with a ‘.json’ extension, which is a common practice in node projects.
    * `noEmitOnError`: Do not emit compiler output files like JavaScript source code, source-maps or declarations if any errors were reported.
    * `moduleResolution`: Specify the module resolution strategy. `node` is for Node.js’ CommonJS implementation.
		* `module`: Sets the module system for the program.
		* `lib`: See https://www.typescriptlang.org/tsconfig#lib
    * `sourceMap`: Enables the generation of sourcemap files. These files allow debuggers and other tools to display the original TypeScript source code when actually working with the emitted JavaScript files. Source map files are emitted as .js.map (or .jsx.map) files next to the corresponding .js output file.
    * `target`: The target setting changes which JS features are downleveled and which are left intact. For example, an arrow function `() => this` will be turned into an equivalent `function` expression if `target` is ES5 or lower.
    * `outDir`: If specified, `.js` (as well as `.d.ts`, `.js.map`, etc.) files will be emitted into this directory. The directory structure of the original source files is preserved.
* `include`: Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the `tsconfig.json` file.

## Step 4
Add a build script to your `package.json` file:

```json
{
  "scripts": {
    "build": "tsc --build"
  },
  ...
}
```

Now you can run `npm run build` to build your plain `.js` files and get type checking during the build process.

## Step 5
Write JavaScript code like you normally would inside of `.js` files instead of `.ts` files, but remember to use JSDocs in your code in order to get type checking. Then run `npm run build` to run the build process and check for type errors.

## Step 6
Create a test script that also uses TypeScript:

```json
{
  "scripts": {
    "test": "jest && tsc",
    "build": "tsc --build"
  },
  ...
}
```

Now, when you run `npm test`, Typescript (`tsc`) will run, look at your JSDoc typings, and typecheck all our `.js` files.



## References:
* [Compile TypeScript code (Node.js)](https://docs.microsoft.com/en-us/visualstudio/javascript/compile-typescript-code-npm?view=vs-2022)
* [JSDoc typings: all the benefits of TypeScript, with none of the drawbacks](https://gils-blog.tayar.org/posts/jsdoc-typings-all-the-benefits-none-of-the-drawbacks/#configuring-typescript-options-correctly)
