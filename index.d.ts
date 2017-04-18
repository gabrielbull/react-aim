export as namespace ReactAim;
export = ReactAim;

import { Component, ReactElement } from 'react';

declare namespace ReactAim {
  type TargetSpec = {
    mouseEnter: (props: any, component: ReactElement) => void,
    mouseLeave: (props, component: ReactElement) => void,
    aimMove: (props, component: ReactElement, distance: number) => void,
    aimStart: (props, component: ReactElement, distance: number) => void,
    aimStop: (props, component: ReactElement) => void
  }

  function target<P, S>(): Component<P, S>;
  function target<P, S>(spec: TargetSpec): Component<P, S>;
  function target<P, S>(source: any, spec: TargetSpec): Component<P, S>;

  type SourceSpec = {
    mouseEnter: (props: any, component: ReactElement) => void,
    mouseLeave: (props, component: ReactElement) => void,
  };

  function source<P, S>(): Component<P, S>;
  function source<P, S>(spec: SourceSpec): Component<P, S>;
  function source<P, S>(target: any, spec: SourceSpec): Component<P, S>;
}
