const { build } = require('esbuild')
const { cpSync } = require('fs')
const path = require('path')

const extensionRoot = path.resolve(__dirname, '..')
const srcDir = path.join(extensionRoot, 'src')
const outDir = path.join(extensionRoot, '..', 'extension-chrome', 'src')

async function main () {
  try {
    // Ensure output dir exists
    cpSync(outDir, outDir, { recursive: true })
  } catch (err) {
    // ignore
  }

  try {
    await build({
      entryPoints: [path.join(srcDir, 'background.js')],
      bundle: true,
      platform: 'browser',
      outfile: path.join(outDir, 'background.js'),
      sourcemap: false,
      format: 'iife',
      target: ['es2020']
    })

    // Copy static files needed by the Chrome scaffold
    cpSync(path.join(srcDir, 'content.js'), path.join(outDir, 'content.js'), { recursive: true })
    cpSync(path.join(srcDir, 'images'), path.join(extensionRoot, '..', 'extension-chrome', 'images'), { recursive: true })
    cpSync(path.join(srcDir, 'sites'), path.join(extensionRoot, '..', 'extension-chrome', 'sites'), { recursive: true })
    cpSync(path.join(srcDir, '_locales'), path.join(extensionRoot, '..', 'extension-chrome', '_locales'), { recursive: true })

    console.log('Chrome build completed successfully')
  } catch (err) {
    console.error('Chrome build failed')
    console.error(err)
    process.exit(1)
  }
}

main()
