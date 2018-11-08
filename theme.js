import { future } from 'mdx-deck/themes';
import funky from 'react-syntax-highlighter/styles/prism/funky';
import bash from 'react-syntax-highlighter/languages/prism/bash';

export default {
  ...future,
  prism: {
    style: funky
  },
  languages: {
    bash
  }
}
