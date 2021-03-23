
module AuthPluginType = {
  @deriving(abstract)
  type t = {
    @optional
    header: string,
    @optional
    backgroundImage: string,
    @optional
    backgroundColor: string,
    @optional
    loaderComponent: string,
    @optional
    routes: array<string>,
  }
  let make = t
}

module AuthPluginConfig = {
    @deriving(abstract)
    type t = {
      @optional
      storeName: string,
      @optional
      reducer: () => unit,
      @optional
      sagas: () => unit,
      @optional
      preloadedState: string,
      @optional
      listener: string,
      @optional
      wrapperComponent: string,
  }
  let make = t
}

module ContextOptions = {
  @deriving(abstract)
  type t = {
    @optional
    baseUrl: string,
    @optional
    requestCredentials: string,
  }
  let make = t
}


@module("@frontegg/react-hooks") @react.component
external make: (~children: React.element) => React.element =
  "FronteggProvider"
