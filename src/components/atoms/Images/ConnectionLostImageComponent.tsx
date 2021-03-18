import * as React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Ellipse, G, Path } from 'react-native-svg';
import { IconsPops } from '../Icons';

const ConnectionLostImageComponent: React.FC<IconsPops> = ({
  height = Dimensions.get('window').height * 0.4,
  width = Dimensions.get('window').width * 0.8,
  style = {},
}): JSX.Element => {
  return (
    <Svg style={style} viewBox="0 0 500 500" height={height} width={width}>
      <Ellipse cx={249.03} cy={368.25} rx={228.44} ry={118.95} fill="#f5f5f5" />
      <G fill="#e6e6e6">
        <Ellipse cx={395.38} cy={348.61} rx={60.93} ry={35.18} />
        <Path d="M150 327.73c23.31 13.46 24.26 35.68.94 49.14s-62.05 13.06-85.37-.4-23.31-35.28 0-48.74 61.1-13.46 84.43 0z" />
        <Path d="M340.14 400.26l-76.52-44.18a9.57 9.57 0 00-8.66 0l-76.52 44.18c-2.39 1.38-2.39 3.62 0 5l34.85 20.12-32.55 18.79c-6.61 3.81-17.37 3.81-24 0l-51.2-29.56c-2.82-1.63-4.38-3.68-4.38-5.76s1.56-4.14 4.38-5.77l45.37-26.2a2 2 0 10-2-3.46l-45.35 26.18c-4.11 2.38-6.38 5.66-6.38 9.24s2.27 6.85 6.38 9.23l51.2 29.56a30.56 30.56 0 0028 0l34.55-19.94L255 449.44a9.57 9.57 0 008.66 0l76.52-44.18c2.35-1.38 2.35-3.62-.04-5z" />
      </G>
      <Path
        d="M427.58 332.09s2.78-41.18 2-56.36c-.65-12-2.28-17-2.62-19.71 0 0-2.95-28-3.19-51.89-.12-11.48-1.18-19.64-7.47-33.28l-40.43 9.67c-.82 6.06-3.6 46.36-4.26 82.19-.57 31.37.32 58.83.32 58.83v1.65c0 1.84-.4 3.12-1.58 6.06a35.32 35.32 0 01-6.26 10.36c-.83.9-6.6 5.94-7.36 7-2.48 2.89 2.66 4.52 6.47 4 4-.54 10.26-2.07 12-4.51 1.18-1.64 2.07-7.35 3.28-9 4.09-5.58 5.77-8 5.8-9.76.06-3.22-1.05-4.49-1.45-6.31.33-3.8 8.54-35.05 8.68-46.12.07-5.27-.29-12.53-.29-12.53l6.36-36.52c2.46 9.12 6.78 31.76 8.24 40.45 1.77 10.62 6.4 37.88 9.14 54.14 1.05 6.27 1.54 9.44 2 12.35l.11 1.24c.09 1.58 1.24 18.48 1.86 22 1.3 7.39 7.87 6.46 8.92.48.9-5.08-.22-20.84-.25-22.77z"
        fill="#ffa8a7"
      />
      <Path
        d="M427.58 332.09c1.86 0 .64 7.21 1.12 11.82.51 4.95 2.13 8.57 2.6 12.62a16.48 16.48 0 01-1.55 10.39c-1.29 3-7.79 7-10.26 2.79s-3-9.08-2.71-13.7 0-7.72.09-11.35c.09-3.2-2.26-11.37.15-11.83l.11 1.24c.87 1.73 9.65 2.07 10.53-.27z"
        fill="#37474f"
      />
      <Path
        d="M384.7 331.27c.57 2.31 0 8.65 0 8.65s-1 2.19-4.57 3.64l-1.6-8.82z"
        fill="#263238"
      />
      <Path d="M380.11 343.56l-7.86-2.58-1.9-6.98 8.84 4.47.92 5.09z" />
      <Path
        d="M371.93 323.19v-1.65c-1.07.52-3.42 9.13-6.6 15-2.9 5.39-8.65 8.39-10.52 10.74-2.5 3.13 2.36 7.18 10.15 5.51 3.87-.83 9.73-3.3 11.32-5.91s2.12-7.41 3.42-9.33 4.39-4.13 5-6.31a12 12 0 000-6c-.61-2-1.15-4.39-1.83-4.17v1.51c-.52 1.06-2.41 2.3-6.34 2.52-1.92.09-3.74-.2-4.6-1.91z"
        fill="#37474f"
      />
      <Path
        d="M375.05 180s-2.67 29.67-3.53 55.94-.09 60.17-.09 60.17 2.71 1.94 8.68 2.21 8-1.72 8-1.72 3.65-11.91 4.22-20.29a85.71 85.71 0 000-13.63l5.33-35.06s6.76 34.52 7.53 38.69 7.24 41.06 7.24 41.06 2.54 2.34 9.06 2.22c5.77-.11 7.44-2.18 7.44-2.18s1.39-22.62 1.07-32.28c-.27-8.52-2.22-15.3-2.61-20.83s-.61-37-1-49-1.39-22.3-11.66-36.74z"
        fill="#455a64"
      />
      <Path
        d="M397.7 227.65l-4.44-22s-7.73-2-11.34-6.74c0 0 1 5.24 9 8.59l4.72 21.88L394 252z"
        fill="#37474f"
      />
      <G>
        <Path
          d="M318.56 174.53a19.1 19.1 0 008.51-.63 16.74 16.74 0 01-3.37-2.23 2.33 2.33 0 01-.4-3.22c.37-.4 1.29.53 3.37 1.12 2.66.75 4.59.91 7.15 2.39a4.69 4.69 0 003.2.56c6.24-1.17 20.79-8 27.46-11.56 1.36-5.55 3.72-13.71 6.63-23.89 2.69-9.38 7-13.48 13.88-13.33l-.99 20.37s-3.28 14.07-7.34 25.56c-.71 2-3.56 4.33-8.78 6.27-6.76 2.51-14.92 4.88-24.89 7.61a77.29 77.29 0 01-12.34 2.45c-10.54.9-14.58-2-16-4.08-4.04-5.74-1.65-8.5 3.91-7.39z"
          fill="#ffa8a7"
        />
        <Path
          d="M402.72 123.59l9.62.74a22.36 22.36 0 007.24 21.54l-4.29 17.28c.14 2.14 3.68 9.34 7.11 17.08-6.45 8.64-38.09 11.59-48.41 4 1.59-8.14 2.78-14.32 3.1-17.41l-.52-11.17c-12.94-10.61 2.67-26.78 8.42-31.92l7.22-.32z"
          fill="#407bff"
        />
        <Path
          d="M443.23 209.68a5.39 5.39 0 01-2.06-4.64c.17-1.61.54-3.63 1.21-4.41s4.87-6.49 6.73-3.17c2 3.62 1.59 5.09 1.59 5.09z"
          fill="#f28f8f"
        />
        <Path
          d="M430.27 286a25.84 25.84 0 01-12.75-3.86l-49.93-28.84c-7.71-4.45-14-15.32-14-24.23v-41.89a8 8 0 00-12-6.9l-17.48 10.12a2 2 0 11-2-3.46l17.53-10.13a12 12 0 0118 10.37v41.89c0 7.5 5.5 17 12 20.77l49.93 28.82c6.39 3.69 12.32 4.33 16.68 1.82s6.77-8 6.77-15.35v-53.48c0-9.06 5.79-19.5 13.18-23.77l12.19-7a2 2 0 112 3.46l-12.19 7c-6.06 3.5-11.18 12.79-11.18 20.3v53.48c0 8.86-3.12 15.54-8.77 18.81a15.68 15.68 0 01-7.98 2.07z"
          fill="#37474f"
        />
        <Path
          d="M344 193.29v3.27c0 5.23-3.67 11.6-8.21 14.21l-30.28 17.49-30.79-17.78v-26.66L304.58 170c4.75-2.19 12.27-1.85 16.81.76l14.38 8.31c4.53 2.62 8.23 8.99 8.23 14.22z"
          fill="#37474f"
        />
        <Path
          d="M304.58 170c4.75-2.19 12.27-1.85 16.81.76l14.38 8.31c4.53 2.61 4.35 6.51-.4 8.71l-29.89 13.8-30.8-17.77z"
          fill="#455a64"
        />
        <Path
          d="M308.39 195.18a9.07 9.07 0 014.1 7.1v21.93l-7 4-30.79-17.78v-26.61l7.8-3.6z"
          opacity={0.15}
        />
        <Path
          d="M272.07 179.23a2.85 2.85 0 012.88.28L305.23 197a9.06 9.06 0 014.1 7.11v26.08a2.85 2.85 0 01-1.2 2.64c-.7.39-3.17 1.82-3.86 2.23a2.87 2.87 0 01-2.89-.28l-30.29-17.49a9.07 9.07 0 01-4.1-7.1v-26.08a2.89 2.89 0 011.19-2.65z"
          fill="#37474f"
        />
        <Path
          d="M301.38 199.22l-30.29-17.48c-2.26-1.31-4.1-.25-4.1 2.37v26.08a9.07 9.07 0 004.1 7.1l30.29 17.49c2.26 1.31 4.1.25 4.1-2.37v-26.08a9.09 9.09 0 00-4.1-7.11z"
          fill="#455a64"
        />
        <Path
          d="M265.51 229.58v4.51c0 1.83.63 3.1 1.67 3.7l2.72 1.57a4 4 0 004.1-.36l25-14.46v-17.8l-2.72-1.57-25.05 14.46a12.69 12.69 0 00-5.72 9.95zm11.33-5.58a4 4 0 01.16 1 8.5 8.5 0 01-3.85 6.67 3.62 3.62 0 01-1 .4 4.11 4.11 0 01-.14-1 8.51 8.51 0 013.85-6.67 4.74 4.74 0 01.98-.4z"
          fill="#407bff"
        />
        <Path
          d="M269.76 239.26a1 1 0 00.17.12l-.1-.06-2.63-1.53c-1.05-.58-1.67-1.85-1.67-3.69v-4.51a11.64 11.64 0 011.69-5.67l2.72 1.57a11.8 11.8 0 00-1.68 5.67v4.51a4.59 4.59 0 001.05 3.22 2.45 2.45 0 00.45.37z"
          opacity={0.2}
        />
        <Path
          d="M299 206.74l-25 14.46a11.72 11.72 0 00-4.06 4.28l-2.72-1.57a11.78 11.78 0 014.05-4.28l25.05-14.46zM270 239.45h-.07.07z"
          fill="#fff"
          opacity={0.5}
        />
        <Path
          d="M270 239.43zM277 225a4.27 4.27 0 00-.14-1.07c1.65-.45 2.86.58 2.86 2.64a8.52 8.52 0 01-3.84 6.67c-1.78 1-3.3.49-3.72-1.17a3.27 3.27 0 001-.4A8.53 8.53 0 00277 225z"
          opacity={0.2}
        />
        <Path
          d="M242.42 216.24v4.52c0 1.82.63 3.1 1.67 3.69l2.72 1.58a4 4 0 004.08-.38l25-14.47v-17.77l-2.72-1.58-25 14.46a12.72 12.72 0 00-5.75 9.95zm11.33-5.61a4.33 4.33 0 01.14 1.07 8.51 8.51 0 01-3.85 6.67 4.6 4.6 0 01-1 .4 3.81 3.81 0 01-.14-1.05 8.52 8.52 0 013.84-6.67 3.91 3.91 0 011.01-.42z"
          fill="#407bff"
        />
        <Path
          d="M246.93 226.1H246.81l-2.72-1.59c-1.05-.59-1.67-1.86-1.67-3.7v-4.51a9.88 9.88 0 01.45-2.84 13.48 13.48 0 011.23-2.82l2.72 1.56a12.69 12.69 0 00-.69 1.38 10.89 10.89 0 00-1 4.28v4.51a4.61 4.61 0 001 3.22 2.8 2.8 0 00.8.51z"
          opacity={0.2}
        />
        <Path
          d="M275.92 193.41l-25 14.46a11.64 11.64 0 00-4.06 4.28l-2.72-1.56a11.77 11.77 0 014-4.3l25-14.46zM247 226.12h-.07.05z"
          fill="#fff"
          opacity={0.5}
        />
        <Path
          d="M253.88 211.69a4.21 4.21 0 00-.13-1.06c1.64-.46 2.86.58 2.86 2.64a8.52 8.52 0 01-3.84 6.67c-1.79 1-3.3.49-3.72-1.18a3.12 3.12 0 001-.4 8.5 8.5 0 003.83-6.67z"
          opacity={0.2}
        />
        <Path
          d="M250 199.55a1.49 1.49 0 01-1.45-1.13l-4-15.68a1.5 1.5 0 012.91-.75l4 15.69a1.48 1.48 0 01-1.08 1.82 1.57 1.57 0 01-.38.05zM238.74 206.09a1.5 1.5 0 01-.93-.32L222.92 194a1.5 1.5 0 111.86-2.35l14.89 11.76a1.51 1.51 0 01.25 2.11 1.48 1.48 0 01-1.18.57zM218.22 220.45a1.5 1.5 0 01-.11-3l17.41-1.35a1.49 1.49 0 011.61 1.38 1.51 1.51 0 01-1.38 1.61l-17.41 1.35z"
          fill="#e0e0e0"
        />
        <Path
          d="M456.84 193.36a98.58 98.58 0 00-1.64-11 148.11 148.11 0 00-9.06-24.81c-1.67-3.19-5.44-7.84-8.11-11.77-3.78-5.55-6.44-8.66-9.31-12.43-6.32-8.27-9-8.75-16.38-9-1 2.63-3.28 13.41 4.11 22.12l15.84 16.7c.9 1.45 10.58 18 12.19 24.11a4.52 4.52 0 01-.38 3.23 39 39 0 00-2.77 8.76c-.47 2.12-1.73 3.8-1.3 4.13a2.84 2.84 0 003.51-.28 15.05 15.05 0 002.73-4.12 2.15 2.15 0 012.29 2.19c.09 1.23-.47 2.94-.9 5.07-.08.42-.18.9-.37 2.06a13.42 13.42 0 00-.28 2.38c2 .37 4.09-.85 7.45-4 3.03-2.94 3.23-6.8 2.38-13.34z"
          fill="#ffa8a7"
        />
        <Path
          d="M404.44 118.73c.06-2 6.56-6.68 9.85-11.66 3-4.62 7.31-17.32-2.79-21.38 0 0 2.18-6.09-1.78-9.68s-9.29-1.37-10.13.13a9 9 0 00-8.46-6.64 7.87 7.87 0 00-8.28 6.17 7.59 7.59 0 00-9.21 2.58c-3.71 5.11 1.21 9.79 1.21 9.79A4.25 4.25 0 00373 92c.29 2.16 2.36 2.69 2.6 3.77a1.06 1.06 0 01-1.81.94 2.18 2.18 0 002.56 1.73c2.33-.13 4.41-3.3 4.41-3.3z"
          fill="#263238"
        />
        <Path
          d="M383.24 85.05c-3 1.3-5.83 5.87-5.79 18.65 0 10.83 3.36 13.57 5 14.38s4.95.39 8.14-.1v6.23s-5.77 7.16-.6 10.72c13.32-2.33 14.34-11.07 14.34-11.07l.24-13.58s1.83 1.92 5-.9c2.66-2.33 3.62-6.32 1.62-8.52s-4.56-2.37-6.88.08c0 0-4.25.28-10.64-3.73s-8.67-8.08-10.43-12.16z"
          fill="#ffa8a7"
        />
        <Path
          d="M390.91 110.48a1.56 1.56 0 01-1.48 1.66 1.61 1.61 0 111.48-1.66z"
          fill="#b16668"
        />
        <Path
          d="M382.68 100a1.44 1.44 0 11-1.5-1.45 1.47 1.47 0 011.5 1.45zM393.75 100.66a1.56 1.56 0 01-1.48 1.66 1.59 1.59 0 01-1.6-1.56 1.54 1.54 0 113.08-.1zM381.68 94.27l-3.05 1.79a1.7 1.7 0 002.4.65 1.83 1.83 0 00.65-2.44zM404.37 99.18v6a2.82 2.82 0 01-2.89-2.92 3.1 3.1 0 012.89-3.08z"
          fill="#263238"
        />
        <Path
          fill="#f28f8f"
          d="M386.62 98.57l-.61 8.64-4.56-1.07 5.17-7.57zM390.63 118c3.35-.39 10.27-2.31 11.4-5.13a7.35 7.35 0 01-2.48 3.57c-2.09 1.8-8.93 3.66-8.93 3.66z"
        />
      </G>
      <G>
        <Path
          d="M430.9 51.18a13.78 13.78 0 013.55 2 10.75 10.75 0 012.65 2.79 8.68 8.68 0 011.3 3.44 7.65 7.65 0 01-.47 3.87 7.9 7.9 0 01-1.59 2.66 9.5 9.5 0 01-2.13 1.68 14.81 14.81 0 01-2.4 1.1l-2.36.85a11.94 11.94 0 00-2 .94 3.57 3.57 0 00-1.45 1.34 1.76 1.76 0 01-.66.64 1 1 0 01-.86.05l-3.12-1.17a1.18 1.18 0 01-.67-.63 1 1 0 010-.89 7.71 7.71 0 011.74-2.56 10.91 10.91 0 012.25-1.63 15.6 15.6 0 012.46-1.06c.84-.28 1.62-.55 2.35-.83a10.4 10.4 0 001.89-.92 2.79 2.79 0 001.12-1.38 3.29 3.29 0 00-.34-3.06 6 6 0 00-3.11-2.31 5.73 5.73 0 00-6.43 1.55 2.59 2.59 0 01-.69.52 1.15 1.15 0 01-.84-.06l-3.32-1.25a.93.93 0 01-.54-.49.85.85 0 010-.75 6.67 6.67 0 012-2.6 10.71 10.71 0 013.27-1.86 13 13 0 014.07-.74 11.48 11.48 0 014.33.76zm-7.12 23.9a1.1 1.1 0 01.65.62 1.13 1.13 0 010 .9l-1.36 3.61a1.1 1.1 0 01-.62.65 1.13 1.13 0 01-.9 0l-3.53-1.33a1.1 1.1 0 01-.65-.62 1.13 1.13 0 010-.9l1.36-3.61a1.15 1.15 0 01.62-.66 1.17 1.17 0 01.9 0zM432.63 94.28a1.1 1.1 0 010 1.57l-2.5 2.64a1.08 1.08 0 01-.78.34 1.11 1.11 0 01-.8-.3L426 96.08a1.08 1.08 0 01-.34-.78 1.07 1.07 0 01.3-.8l2.51-2.63a1.12 1.12 0 011.57 0zm15-18.13a13.34 13.34 0 012.37 3 10.44 10.44 0 011.27 3.4 8.25 8.25 0 01-.17 3.45 8 8 0 01-4.19 4.91 8.77 8.77 0 01-2.46.68 14.86 14.86 0 01-2.49.07l-2.36-.13a12.13 12.13 0 00-2.11.07 3.4 3.4 0 00-1.72.7 1.56 1.56 0 01-.81.31.94.94 0 01-.77-.27l-2.27-2.16a1.15 1.15 0 01-.36-.79.92.92 0 01.32-.79 7.27 7.27 0 012.44-1.6 10.23 10.23 0 012.55-.59 15.29 15.29 0 012.53 0q1.25.11 2.34.15a9.53 9.53 0 002-.11 2.61 2.61 0 001.49-.78 3.13 3.13 0 00.82-2.78 5.62 5.62 0 00-1.85-3.15 5.42 5.42 0 00-6.16-1 2.3 2.3 0 01-.78.19 1 1 0 01-.71-.36l-2.42-2.31a.92.92 0 01-.3-.61.88.88 0 01.26-.67 6.45 6.45 0 012.68-1.53 10.2 10.2 0 013.52-.41 12.17 12.17 0 013.81.86 10.6 10.6 0 013.49 2.25z"
          fill="#407bff"
        />
        <Path
          d="M432.63 94.28a1.1 1.1 0 010 1.57l-2.5 2.64a1.08 1.08 0 01-.78.34 1.11 1.11 0 01-.8-.3L426 96.08a1.08 1.08 0 01-.34-.78 1.07 1.07 0 01.3-.8l2.51-2.63a1.12 1.12 0 011.57 0zm15-18.13a13.34 13.34 0 012.37 3 10.44 10.44 0 011.27 3.4 8.25 8.25 0 01-.17 3.45 8 8 0 01-4.19 4.91 8.77 8.77 0 01-2.46.68 14.86 14.86 0 01-2.49.07l-2.36-.13a12.13 12.13 0 00-2.11.07 3.4 3.4 0 00-1.72.7 1.56 1.56 0 01-.81.31.94.94 0 01-.77-.27l-2.27-2.16a1.15 1.15 0 01-.36-.79.92.92 0 01.32-.79 7.27 7.27 0 012.44-1.6 10.23 10.23 0 012.55-.59 15.29 15.29 0 012.53 0q1.25.11 2.34.15a9.53 9.53 0 002-.11 2.61 2.61 0 001.49-.78 3.13 3.13 0 00.82-2.78 5.62 5.62 0 00-1.85-3.15 5.42 5.42 0 00-6.16-1 2.3 2.3 0 01-.78.19 1 1 0 01-.71-.36l-2.42-2.31a.92.92 0 01-.3-.61.88.88 0 01.26-.67 6.45 6.45 0 012.68-1.53 10.2 10.2 0 013.52-.41 12.17 12.17 0 013.81.86 10.6 10.6 0 013.49 2.25z"
          fill="#fff"
          opacity={0.6}
        />
      </G>
      <G>
        <Path
          d="M76.81 345.71c3.17 1.93 7.38 2 11.35.61l3-21-14-3.58z"
          fill="#ffa8a7"
        />
        <Path
          d="M99.4 365.81c.35.36.14 3-.29 3.59s-2.84 2.59-7.28 2.67c-4.23.07-8-.7-10.36-2.41s-3.49-3.5-3.6-5.92.29-4.71-.75-6.62-2.29-3.51-2.61-4.45a12 12 0 010-5.17z"
          fill="#263238"
        />
        <Path
          d="M89.13 345.44a11.56 11.56 0 00.38 2.7 24.77 24.77 0 002.29 5.42 22.77 22.77 0 001.63 2.57c1.19 1.59 2.71 2.92 4 4.45a8.61 8.61 0 012.33 5.32c0 3.32-3.65 4.25-6.44 4.59a20.33 20.33 0 01-9-.93 8.26 8.26 0 01-5.69-6.92c-.11-.93 0-1.86-.06-2.79a12.93 12.93 0 00-2.26-5.93 17 17 0 01-1.8-3.26c-.76-2.09.06-4.36.72-6.37.57-1.73 1-3.82 1.64-3.62v1.13c.18.39.62.67.73 1.13a8.59 8.59 0 00.43 1.39 3.6 3.6 0 001.38 1.7c.11-1.25.22-2.5.32-3.74a1.31 1.31 0 011.43-1.49 23.59 23.59 0 017.11-.21 1.36 1.36 0 01.93.47 1.44 1.44 0 01.11.85 32.79 32.79 0 00-.18 3.54z"
          fill="#407bff"
        />
        <Path
          d="M89.13 345.44a11.56 11.56 0 00.38 2.7 24.77 24.77 0 002.29 5.42 22.77 22.77 0 001.63 2.57c1.19 1.59 2.71 2.92 4 4.45a8.61 8.61 0 012.33 5.32c0 3.32-3.65 4.25-6.44 4.59a20.33 20.33 0 01-9-.93 8.26 8.26 0 01-5.69-6.92c-.11-.93 0-1.86-.06-2.79a12.93 12.93 0 00-2.26-5.93 17 17 0 01-1.8-3.26c-.76-2.09.06-4.36.72-6.37.57-1.73 1-3.82 1.64-3.62v1.13c.18.39.62.67.73 1.13a8.59 8.59 0 00.43 1.39 3.6 3.6 0 001.38 1.7c.11-1.25.22-2.5.32-3.74a1.31 1.31 0 011.43-1.49 23.59 23.59 0 017.11-.21 1.36 1.36 0 01.93.47 1.44 1.44 0 01.11.85 32.79 32.79 0 00-.18 3.54z"
          opacity={0.2}
        />
        <Path
          d="M92.21 354.28c-1.18-1-3.94-1.15-5.46-1.07a9.22 9.22 0 00-4.37 1.27 1 1 0 01-1.25-.17.92.92 0 01.16-1.4 9.45 9.45 0 014.93-1.53C90 351.32 91 352 91 352s1.64 1.2 1.21 2.28zM94.86 357.82c-1.5-1-4.54-1-6.06-.95a8.6 8.6 0 00-4.25 1.36 1 1 0 01-1.26-.17.91.91 0 01.17-1.4 9.55 9.55 0 015-1.66c3.73-.07 4.66.75 4.66.75a3.07 3.07 0 011.74 2.07zM84.93 347.75a9.27 9.27 0 014.65.64c.63.41 1 1.46.57 1.7a8.66 8.66 0 00-4.15-.79 12.24 12.24 0 00-4.07.89c-.33.12-.71.3-1 .46a.87.87 0 01-1.2-.44.84.84 0 01.38-1 11.93 11.93 0 014.82-1.46z"
          fill="#455a64"
        />
        <Path
          d="M116.27 337.82c2.44 6.11 6.26 4.23 12.08.71l.88-20.86-14.81-1.37z"
          fill="#ffa8a7"
        />
        <Path
          d="M150.69 352.53a4 4 0 01-.32 2.93c-.46.84-5.09 3.14-11.14 2.4a25.22 25.22 0 01-12.32-5.06c-2.23-1.66-4.62-2.07-7.62-2.41s-5.25-1.38-5.84-2.82.31-3.82.31-3.82z"
          fill="#263238"
        />
        <Path
          d="M127.13 333.3a11.94 11.94 0 001.61-.46 1.31 1.31 0 01.91 0c.38.17.5.63.59 1a13.86 13.86 0 00.52 2.67 6.54 6.54 0 001.6 1.88 27.83 27.83 0 004.69 3.39c1.93 1.18 3.83 2.11 5.82 3.14s4.78 1.77 6.36 3c2.29 1.74 2.38 5.79-.42 7.23-2.41 1.25-8.65 2.41-15 .23-3.47-1.19-7.17-5.16-11.77-5.77-2.93-.38-6.83-.84-8.6-3.17-.64-1-.08-3.9.44-7.29.47-3 .9-7.8 1.87-7.48l.07.92L117 334a10.07 10.07 0 00.82.78 14.84 14.84 0 001 1.06 3 3 0 001.69.71 1.56 1.56 0 00.85-.19c.5-.28.57-.94 1-1.35a4.88 4.88 0 011.64-1.11 9.61 9.61 0 012.66-.54 3.65 3.65 0 00.47-.06z"
          fill="#407bff"
        />
        <Path
          d="M127.13 333.3a11.94 11.94 0 001.61-.46 1.31 1.31 0 01.91 0c.38.17.5.63.59 1a13.86 13.86 0 00.52 2.67 6.54 6.54 0 001.6 1.88 27.83 27.83 0 004.69 3.39c1.93 1.18 3.83 2.11 5.82 3.14s4.78 1.77 6.36 3c2.29 1.74 2.38 5.79-.42 7.23-2.41 1.25-8.65 2.41-15 .23-3.47-1.19-7.17-5.16-11.77-5.77-2.93-.38-6.83-.84-8.6-3.17-.64-1-.08-3.9.44-7.29.47-3 .9-7.8 1.87-7.48l.07.92L117 334a10.07 10.07 0 00.82.78 14.84 14.84 0 001 1.06 3 3 0 001.69.71 1.56 1.56 0 00.85-.19c.5-.28.57-.94 1-1.35a4.88 4.88 0 011.64-1.11 9.61 9.61 0 012.66-.54 3.65 3.65 0 00.47-.06z"
          opacity={0.2}
        />
        <Path
          d="M134.4 340a2.76 2.76 0 00-2.1-1.57c-1.32-.32-3.73.54-5.26 1.67a1.1 1.1 0 00.06 1.82 1.12 1.12 0 001.26-.07 8.32 8.32 0 016.04-1.85zM138.41 342.57a3.15 3.15 0 00-2.5-1.46 9.76 9.76 0 00-5.76 1.81 1.07 1.07 0 000 1.76 1.07 1.07 0 001.22-.08 8.42 8.42 0 017.04-2.03zM142.87 344.91a3.51 3.51 0 00-2.6-1.34 9.46 9.46 0 00-5.53 1.84 1.07 1.07 0 00.06 1.76 1 1 0 001.21-.07 8 8 0 016.86-2.19zM76.42 289.41c.45-10.07 2.59-15.31 2.89-18.1 0 0 .82-55.4 2.17-72.21l49.6-2.11c.73 18 1.39 66.36 1 72.76-.37 6.13-2.86 59.3-2.86 59.3-7 2.19-14.47-1-14.47-1s-4.16-30.25-4.84-36.92a85.23 85.23 0 01.46-18l-3.17-43.07s-3.83 33.4-5.72 46C99.32 290.47 90 335.14 90 335.14c-6.7 1.67-13.22-1.22-13.22-1.22s-1.02-29.92-.36-44.51z"
          fill="#455a64"
        />
        <Path
          d="M107.21 230.1l.94-5.94c2.89-.43 10.21-5 14.54-9a34.5 34.5 0 01-12.16 11.21l-.15 46.78z"
          fill="#37474f"
        />
        <G>
          <Path
            d="M127.55 167.81c-3.37-7.69-9.17-20.64-9.17-20.64l-1.47-21a56.64 56.64 0 016.41.57c3.12.49 8.07 3.47 10.33 9.09 1.69 4.17 10.47 29.61 10.47 29.61l15.3-8.06c3.92-2.49 5.31-6.62 7.81-9s5-2.74 7.77-4.65 3.86-3.44 4.56-1.53-2.4 4.84-3 5.57-3.61 2.29.23 2.49 11.61-3.54 13.47-4.18 1.7 1.57.73 2.94-1.07 5.39-2.69 7.64c-1.72 2.4-2.65 3.43-6.34 4.86-3.43 1.32-10.54 1.66-14.2 3.77s-12.52 10.12-18.43 14.23c-7.93 5.52-12.39 5.88-15.5 1.48s-5.09-10.48-6.28-13.19z"
            fill="#ffa8a7"
          />
          <Path
            d="M114.84 125.72c5.2-.4 11.33-.08 14.72 3 2.71 2.47 3.73 4 6.75 12.54 2 5.73 6.28 18.93 6.28 18.93a27.32 27.32 0 00-15 9.19l-9.75-21.91z"
            fill="#e0e0e0"
          />
          <Path
            d="M144.12 165.39a13.09 13.09 0 00-6.47 5s.37-4 6-6.39z"
            fill="#f28f8f"
          />
          <Path
            d="M102.39 124.78a24.57 24.57 0 00-7.31.8c-4.57 1.21-12.76 3.51-12.76 3.51-2.6 1.35-3.61 5.85-4.2 8.44-1.88 8.29 3 27 3.75 34.29S81 201.44 81 201.44c5.59 6.48 35.88 10.78 50.63 0 0 0 .64-51.27-.81-58.63-2.2-11.14-5.47-16.43-17-17.1z"
            fill="#f5f5f5"
          />
          <Path
            d="M108.86 97.28l-3.29 1.81a2 2 0 01.77-2.62 1.83 1.83 0 012.52.81zM123.17 98.6l-3-2.31a1.82 1.82 0 012.61-.4 2 2 0 01.39 2.71zM93.74 86.81S90.2 87.3 88.9 90c-1.12 2.32-.72 7.92.79 14a56.45 56.45 0 003.8 11.46 4.7 4.7 0 002.7 2.17l-.19-7.26-.26-5s3.23-4.42 3.59-8c.46-4.66-.52-6.57-.52-6.57z"
            fill="#263238"
          />
          <Path
            d="M99.45 93.81A13.53 13.53 0 00113 107.29c7.46 0 13.06-6.15 13-13.62s-5.66-13.45-13.13-13.42a13.52 13.52 0 00-13.42 13.56z"
            fill="#263238"
          />
          <Path
            d="M96 104.52c-1.22 1.06-2.21-1.67-3.23-2.74s-4.37-2.51-6 1 1.46 8.6 4 9.58a3.65 3.65 0 004.31-1.36v16c3.85 6.94 10.64 6.72 14.27 6.33s4.42-4.16 1.77-7.2v-5a28.29 28.29 0 006.1.29c3.32-.52 5-3 6-6.63 1.6-5.79 2.25-15.51 0-26.74-3.72-2.88-16.62-2.4-24.43 2.55.61 10.07-1.63 12.87-2.79 13.92z"
            fill="#ffa8a7"
          />
          <Path
            d="M123.88 82.49a24.39 24.39 0 00.67-6.37c0-.84-.21-1.86-1-2.18s-1.57.26-2.25.72c-2.88 1.94-6.46 2.49-9.93 2.68-6 .33-15.17-.06-18.22 6.51-.85 1.82-1 3.74.68 5a11.5 11.5 0 005 1.86c3 .53 6 1.19 9.08 1.6s6.74.81 9.79-.13c2.57-.79 5.18-1.47 7.09-3.51a9.78 9.78 0 002.62-6.54c0-.34-.07-.77-.41-.86a.78.78 0 00-.49.1z"
            fill="#263238"
          />
          <Path
            d="M111.09 121.24s-7.42-1.47-10-2.84a8.57 8.57 0 01-3.6-3.54 11.65 11.65 0 002 4.18c1.91 2.42 11.58 4.17 11.58 4.17z"
            fill="#f28f8f"
          />
          <Path
            d="M109.6 102.19a1.67 1.67 0 11-1.67-1.72 1.7 1.7 0 011.67 1.72z"
            fill="#263238"
          />
          <Path
            d="M112 113.74a1.6 1.6 0 01-1.56 1.63 1.61 1.61 0 01-1.58-1.63 1.59 1.59 0 011.56-1.62 1.61 1.61 0 011.58 1.62z"
            fill="#b16668"
          />
          <Path
            d="M107.5 96.94l-3.44 2.17a2.13 2.13 0 01.66-2.88 2 2 0 012.78.71zM119.64 94.82l3.62 1.62a1.9 1.9 0 01-2.56 1 2.09 2.09 0 01-1.06-2.62zM121.55 101.69a1.61 1.61 0 11-1.62-1.67 1.65 1.65 0 011.62 1.67z"
            fill="#263238"
          />
          <Path fill="#f28f8f" d="M113.37 98.87l.6 11.12 5.27-1.4-5.87-9.72z" />
          <Path
            d="M20 144.67c1.73.93 8.78 5.89 12.61 6.32 1.62.18 2.06-.08 2-.5-.08-.58-1.11-1.45-1.36-1.92-.43-.82-3-4.22-2-6s1.87-.08 4.25 2.25 4.82 3.14 6.91 5.85 2.79 7 6.25 10.11l13.78 9.41s6.42-29.79 9.24-33.3c3-3.69 15.87 4.35 13.17 16.08S76 185.06 71.72 189.05c-2.76 2.59-8.57.15-15.82-6.3-5.73-5.1-13.58-12.75-16.9-15.46s-10.22-4.17-13.39-6c-3.41-2-4.16-3.17-5.47-5.82-1.23-2.49-.68-6.48-1.41-8s-.49-3.73 1.27-2.8z"
            fill="#ffa8a7"
          />
          <Path
            d="M82.32 129.09c4.42 2.76 4.64 6.78 4.86 11.38a47.57 47.57 0 01-2.52 15.84c-1.87 5.79-4.84 16.36-4.84 16.36s-11.54.27-17.48-4.86c0 0 2.71-11.4 4.62-20s4.23-17.75 15.36-18.72z"
            fill="#e0e0e0"
          />
          <Path
            d="M62.39 170.21c3.15 1.75 5 5.51 5.57 7a11 11 0 00-5.24-8.53z"
            fill="#f28f8f"
          />
        </G>
        <G>
          <Path
            fill="#407bff"
            d="M182.11 386.34l77.18 44.56v16.42l-77.18-44.56v-16.42z"
          />
          <Path
            opacity={0.35}
            d="M182.11 386.34l77.18 44.56v16.42l-77.18-44.56v-16.42z"
          />
          <Path
            fill="#407bff"
            d="M336.47 386.34l-77.18 44.56v16.42l77.18-44.56v-16.42z"
          />
          <Path
            opacity={0.2}
            d="M336.47 386.34l-77.18 44.56v16.42l77.18-44.56v-16.42z"
          />
          <Path
            fill="#407bff"
            d="M336.47 386.34l-77.18-44.55-77.18 44.55 77.18 44.56 77.18-44.56z"
          />
          <Path
            opacity={0.15}
            d="M336.47 386.34l-77.18-44.55-77.18 44.55 77.18 44.56 77.18-44.56z"
          />
          <Path
            opacity={0.1}
            d="M259.29 430.9v-4.69l-69.06-39.87h-8.12l77.18 44.56zM259.29 341.79v4.69l69.06 39.86h8.12l-77.18-44.55z"
          />
          <Path
            fill="#407bff"
            d="M336.47 386.34h-8.12l-69.06 39.87v4.69l77.18-44.56zM259.29 341.79v4.69l-69.06 39.86h-8.12l77.18-44.55z"
          />
          <Path
            d="M259.57 367l33.16 19.14c2.48 1.44 2.48 3.76 0 5.19L268 405.65a9.89 9.89 0 01-9 0l-33.16-19.14c-2.48-1.44-2.48-3.76 0-5.19L250.58 367a9.89 9.89 0 018.99 0z"
            fill="#37474f"
          />
          <Path
            d="M268 405.65l23.91-13.81-32.34-18.67a10 10 0 00-9 0L226.66 387 259 405.65a9.89 9.89 0 009 0z"
            fill="#455a64"
          />
          <Path
            d="M239.54 386.37l14.51-8.37a1.94 1.94 0 011.74 0l1.78 1c.48.27.48.72 0 1l-14.51 8.37a1.92 1.92 0 01-1.73 0l-1.78-1a.53.53 0 01-.01-1zM261.21 398.9l14.51-8.37a1.92 1.92 0 011.73 0l1.79 1c.48.27.48.72 0 1l-14.51 8.37a1.92 1.92 0 01-1.73 0l-1.78-1a.53.53 0 01-.01-1z"
            fill="#263238"
          />
          <Path
            d="M225.76 418.77a9.64 9.64 0 00-4.38-7.57 3.05 3.05 0 00-3.09-.3l-1.89 1.1a3.06 3.06 0 00-1.28 2.82 9.69 9.69 0 004.37 7.58 3.07 3.07 0 003.1.3l1.88-1.13a3.08 3.08 0 001.29-2.8z"
            fill="#407bff"
          />
          <Path
            d="M219.49 412.33a9.64 9.64 0 014.38 7.57c0 2.79-2 3.92-4.38 2.53a9.69 9.69 0 01-4.37-7.58c0-2.78 1.96-3.91 4.37-2.52z"
            opacity={0.1}
          />
        </G>
        <G>
          <Path
            d="M168.76 444.27a28.55 28.55 0 01-14-3.39l-51.2-29.56c-4.11-2.38-6.38-5.66-6.38-9.24s2.27-6.85 6.38-9.23l59.32-34.25c6.5-3.75 12-13.26 12-20.77V150.1a2 2 0 014 0v187.73c0 9.06-6.14 19.71-14 24.24l-59.32 34.25c-2.82 1.63-4.38 3.67-4.38 5.76s1.56 4.14 4.38 5.77l51.2 29.56c6.61 3.82 17.37 3.82 24 0l37.75-21.78a2 2 0 112 3.46l-37.75 21.79a28.5 28.5 0 01-14 3.39z"
            fill="#37474f"
          />
        </G>
        <G>
          <Path
            d="M78.92 78.31a1 1 0 01.16-.79 1 1 0 01.68-.45l4.86-.94a1 1 0 01.8.16 1.09 1.09 0 01.45.68l.75 3.9a1 1 0 01-.17.79 1 1 0 01-.67.46l-4.87.93a1 1 0 01-.79-.16 1 1 0 01-.45-.68zm-4.06-21.06A1.06 1.06 0 0175.7 56l4.87-.94a1 1 0 01.79.17 1 1 0 01.45.67L85 72.57a1 1 0 01-.17.79 1 1 0 01-.67.45l-4.87.94a1 1 0 01-.79-.17 1 1 0 01-.45-.67zM70.8 94.63a1.06 1.06 0 01.08-1.5l3.69-3.31a1 1 0 01.77-.26 1 1 0 01.73.34l2.65 3a1.06 1.06 0 01-.08 1.5L75 97.67a1 1 0 01-.77.26 1 1 0 01-.73-.34zm-14.31-16a1.07 1.07 0 01-.27-.77 1 1 0 01.35-.73l3.69-3.31a1 1 0 01.77-.27 1 1 0 01.73.35l11.32 12.66a1 1 0 01.26.77 1 1 0 01-.34.73l-3.7 3.31a1 1 0 01-.76.26 1 1 0 01-.74-.34z"
            fill="#407bff"
          />
          <Path
            d="M70.8 94.63a1.06 1.06 0 01.08-1.5l3.69-3.31a1 1 0 01.77-.26 1 1 0 01.73.34l2.65 3a1.06 1.06 0 01-.08 1.5L75 97.67a1 1 0 01-.77.26 1 1 0 01-.73-.34zm-14.31-16a1.07 1.07 0 01-.27-.77 1 1 0 01.35-.73l3.69-3.31a1 1 0 01.77-.27 1 1 0 01.73.35l11.32 12.66a1 1 0 01.26.77 1 1 0 01-.34.73l-3.7 3.31a1 1 0 01-.76.26 1 1 0 01-.74-.34z"
            fill="#fff"
            opacity={0.6}
          />
        </G>
      </G>
    </Svg>
  );
};

export default ConnectionLostImageComponent;
