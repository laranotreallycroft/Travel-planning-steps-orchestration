import React from "react";

import LocalizeService from "service/util/localize/LocalizeService";

// --
// ----- Prop types

export interface IWithLocalizeOwnProps {
  translate: (name: string, params?: Record<string, any>) => string;
  hasTranslation: (name: string) => boolean;
}

// --
// ----- Component

/** Higher order component for injecting localization support to components. */
const withLocalize = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLocalize extends React.Component<
    Exclude<P, IWithLocalizeOwnProps>
  > {
    render() {
      const TypedComponent: React.ComponentType<P & IWithLocalizeOwnProps> =
        Component as any;
      return (
        <TypedComponent
          {...this.props}
          translate={LocalizeService.translate}
          hasTranslation={LocalizeService.hasTranslation}
        />
      );
    }
  };

// ----- exports

export default withLocalize;
