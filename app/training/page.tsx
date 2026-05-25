import { permanentRedirect } from 'next/navigation'

/**
 * /training is now the homepage at /.
 * This route 301-redirects to / so existing inbound links, social posts,
 * and ads continue to resolve.
 */
export default function TrainingRedirect() {
  permanentRedirect('/')
}
