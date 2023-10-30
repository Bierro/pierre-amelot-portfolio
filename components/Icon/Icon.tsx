import { type SVGProps } from 'react';
// Material
import PodcastsIconSVG from '@material-design-icons/svg/filled/podcasts.svg';
import BookmarkIconSVG from '@material-design-icons/svg/outlined/bookmark_border.svg';
import ListIconSVG from '@material-design-icons/svg/filled/list.svg';
import TocSVG from '@material-design-icons/svg/filled/toc.svg';
// Radix
import {
  ArrowUpIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
// Phosphor
import { TerminalWindow } from '@phosphor-icons/react/dist/ssr/index';
// Lucide
import { Palette } from 'lucide-react';
// Feather
import { Layout } from 'react-feather';
// Custom
import YoutubeIconSVG from './svgs/YoutubeIcon.svg';

const materialIcons = {
  podcasts: PodcastsIconSVG,
  bookmark: BookmarkIconSVG,
  list: ListIconSVG,
  toc: TocSVG,
} as const;

const radixIcons = {
  arrowUp: ArrowUpIcon,
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
} as const;

const phosphorIcons = { terminalWindow: TerminalWindow } as const;

const lucideIcons = { palette: Palette } as const;

const featherIcons = { layout: Layout } as const;

const customIcons = { youtube: YoutubeIconSVG } as const;

const icons = {
  ...materialIcons,
  ...radixIcons,
  ...phosphorIcons,
  ...lucideIcons,
  ...featherIcons,
  ...customIcons,
} as const;
export type IconName = keyof typeof icons;

export function Icon({
  name,
  size,
  ...svgProps
}: {
  name: IconName;
  size: SVGProps<SVGSVGElement>['width'];
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'viewBox'>) {
  const extraProps: { viewBox?: string; fill?: string } = {};

  // Material icons don't come with a viewBox so we add it to make sure they
  // scale properly
  if (name in materialIcons) {
    extraProps.viewBox = '0 0 24 24';
  }

  // Lucide icons sometimes uses stroke instead of fill and already applies
  // stroke="currentColor"
  if (!(name in lucideIcons || name in featherIcons)) {
    extraProps.fill = 'currentColor';
  }

  const SVG = icons[name];

  return <SVG width={size} height={size} {...extraProps} {...svgProps} />;
}
