import type { Invitation } from '@/lib/types'
import TemplateLuxury from '@/components/templates/TemplateLuxury'
import TemplateFloral from '@/components/templates/TemplateFloral'
import TemplateMidnight from '@/components/templates/TemplateMidnight'
import TemplateRoyal from '@/components/templates/TemplateRoyal'
import TemplateRustic from '@/components/templates/TemplateRustic'
import TemplateCelestial from '@/components/templates/TemplateCelestial'
import TemplateBali from '@/components/templates/TemplateBali'
import TemplateIvory from '@/components/templates/TemplateIvory'

export default function InvitationPreview({ invitation }: { invitation: Invitation }) {
  const props = { invitation, previewMode: true }
  switch (invitation.template_id) {
    case 'floral':    return <TemplateFloral {...props} />
    case 'midnight':  return <TemplateMidnight {...props} />
    case 'royal':     return <TemplateRoyal {...props} />
    case 'rustic':    return <TemplateRustic {...props} />
    case 'celestial': return <TemplateCelestial {...props} />
    case 'bali':      return <TemplateBali {...props} />
    case 'ivory':     return <TemplateIvory {...props} />
    default:          return <TemplateLuxury {...props} />
  }
}
