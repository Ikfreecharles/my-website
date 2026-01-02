import React, { ReactNode } from "react";
import Heading from "@theme/Heading";
import PageWrapper from "@site/src/components/Layout/layout";
import { Feature } from "@site/src/components/Feature/feature";

export default function DataRehydrationAndPersistence(): ReactNode {
  return (
    <PageWrapper>
      <Feature
        title="Data Rehydration, Consistency, and Persistence Across Multiple App Instances in a Portal"
        sections={featuredPost}
      />
    </PageWrapper>
  );
}

const featuredPost = [
  {
    heading: "Product Requirements and Problem Statement",
    body: `This part of the project focused on how application state behaves when the same product is running multiple times inside a third-party portal. Each instance needed to operate independently, without leaking data into other instances, while the overall system remained stateless from end to end.
    The product can be opened alongside other instances of itself. It can also be opened alongside other products in the portal. Users can navigate between these instance (opened as tabs) without losing progress. End to end communication throughout the system is stateless. This was a CRUCIAL requirement. Each instance registers itself with the portal during startup to expose additional functionality. This played an important role in the architecture. There were a couple of resources exposed to the app by the portal which we could use.`,
  },
  {
    heading: "Statelessness as a Design Constraint",
    body: "Statelessness was a crucial requirement. Only a minimal amount of data is stored anywhere, and zero user data is persisted in a backend or long-term cache. That means that if the user refreshes the browser, or the browser refreshes itself, all progress is lost. That behavior was expected and accounted for in the design.",
  },
  {
    heading: "App Instance Registration and Early Lifecycle Handling",
    body: "Each application instance registers itself with the third-party portal during instantiation. This is required since the portal shared context and data with the app. The integration logic was implemented in a dedicated class. And thanks to the abstract methods exposed by the 3rd party portal, we were able to include custom functionalities at this stage. One example was handling temporary persistence when the user switches tabs. When a tab loses focus, the application serializes its current state and stores it in sessionStorage. When the user returns to the tab, the state is rehydrated and then immediately removed from storage for cleanup. This ensures that data does not live longer than the active session. The same integration layer also allows required portal data to be fetched before the application is mounted, making it available for the entire lifecycle of the instance. But then there came the problem of running the instance alongside other instances of the same product and other products.",
  },
  {
    heading:
      "Implementing the design to prevent data bleeding during rehydration and instance life cycle",
    body: "We implemented the integration class as a Singleton. This way, we only had one active instance of the class running and also prevented the data in that instance from being overwritten by another code or instance. Portal-provided data remained consistent throughout the lifecycle of the instance. That alone did not solve the problem. This protected the data the instance got from the 3rd party portal but not data filled in the app itself. To resolve this, we capitalized on the way the portal rendered its tabs. It uses iFrame to display each instance of any product. And with this comes a uniqueId which remains stable for the entire lifecycle of the instance(s).",
  },

  {
    heading: "Rehydration Using iFrame Identity",
    body: "So using this, we were able to temporarily store the data in sessionStorage mapping it to this uniqueId. Therefore when the tab loses focus, the data is stored in the sessionStorage with the uniqueId as the key. And when the tab gets back inFocus, the iFrame key is used to fetch the data from the sessionStorage and destroyed. This way, we have a rather streamlined source of truth. In the background, using the Singleton meant the instanceId is the same throughout the lifecycle of the instance and the third party portal will always use this as the point of contact with the app instance. And then the different part of the program/instance is aware of the same resources.",
    diagram: `
graph LR;
    A(Mount portal)-->|uniqueId| B(App mounts);
    B-->C(Redux state instantiates);
    C-->D(User tab interaction);
    D-->|tab loses focus| E(Writes to sessionStorage);
    D-->|tab gets in focus| F(Read data from sessionStorage)
    F-->|No new class instance instantiated| B`,
  },
  {
    heading:
      "Extending and exposing functionalities between the app and the 3rd party services",
    body: "As part of the requirements, authorized user credentials logged in to the portal can access services such as printing, contract signature and closing. These are further services extended and provided by the 3rd party portal. Using the Singleton pattern, methods that depend on the 3rd party data don’t pose the risk of recreating another class instance leading to undesired inconsistent states.",
  },
];
