import { getPayload } from 'payload'
import * as dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Load environment variables
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const payloadConfigPath = path.join(__dirname, '../src/payload.config.ts')
const SAFE_BATCH_SIZE = 150

async function main() {
  const awaitedConfig = (await import(payloadConfigPath)).default
  const payload = await getPayload({ config: awaitedConfig })

  try {
    const media = await payload.find({
      collection: 'media',
      depth: 0,
      limit: SAFE_BATCH_SIZE,
      where: {
        mimeType: {
          contains: 'image',
        },
      },
    })

    if (media && media.totalDocs > 0) {
      payload.logger.info(`Found ${media.totalDocs} image files (videos excluded).`)

      for (let index = 0; index < media.docs.length; index++) {
        const mediaDoc = media.docs[index]

        try {
          if (mediaDoc.mimeType && mediaDoc.mimeType.startsWith('image/')) {
            await payload.update({
              collection: 'media',
              id: mediaDoc.id,
              data: mediaDoc,
              overwriteExistingFiles: true,
            })

            payload.logger.info(
              `✓ Media ${mediaDoc.id} (${mediaDoc.filename}) successfully regenerated.`,
            )
          } else {
            payload.logger.info(
              `⊘ Skipped ${mediaDoc.id} (${mediaDoc.filename}) - not an image.`,
            )
          }
        } catch (err) {
          payload.logger.error(`Media ${mediaDoc.id} (${mediaDoc.filename}) failed to regenerate`)
          console.error(err)
        }
      }
    } else {
      payload.logger.info('No image files found.')
    }
  } catch (err) {
    payload.logger.error('Error while fetching media files.')
    console.error(err)
  }

  payload.logger.info('Done!')
  process.exit(0)
}

main()
