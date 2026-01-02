import { Feature } from "@site/src/components/Feature/feature";
import PageWrapper from "@site/src/components/Layout/layout";
import React, { ReactNode } from "react";

export default function StateManagementDesign(): ReactNode {
  return (
    <PageWrapper>
      <Feature
        title="Application state management design and architecture for a stateless end to end application in double environment product"
        sections={featuredPost}
      />
    </PageWrapper>
  );
}

const featuredPost = [
  {
    heading: "Problem highlights/Requirements",
    body: "The product needed to be accessible to users operating in different environments and with different authorization levels. Some users could access the application through a standard browser, while others — with higher authorization — accessed it through an internally managed portal that we integrated as a third-party service. These authorization levels directly influenced which features were available. Certain functionalities, such as contract closing, printing, discount services, were only exposed to authorized users operating within the portal environment. At the same time, the entire application had to remain stateless from end to end, with no server-side sessions and no requirement to recover data after the session lifecycle ended. This immediately ruled out traditional session-based approaches and forced us to rethink how state should be modeled, scoped, and persisted.",
  },
  {
    heading: "",
    body: "This project focused on designing the application state management architecture for a stateless, end-to-end product that operates across multiple user environments. The challenge wasn’t simply about choosing a state management library, but about aligning authorization, environment constraints, persistence requirements, and stateless architecture into a coherent and scalable solution. From the beginning, it was clear that this problem required architectural thinking rather than just an implementation detail — the kind of thinking that sits at the intersection of Software Engineering and Solutions Architecture.",
  },
  {
    heading: "Why Initialization Context Became the Key Design Decision",
    body: "One of the earliest and most important architectural decisions was realizing that where the application is initialized determines how state must be managed. On application startup — or reinitialization — we perform a one-time check to determine whether the app is running in the native browser or inside the portal. This check only needs to happen once because the execution context of the application cannot change after initialization. That single decision influences the entire state model for the lifetime of the app instance. This allowed us to branch our state management strategy cleanly without introducing runtime ambiguity or conditional logic scattered throughout the codebase.",
  },
  {
    heading: "Native Browser Access and Standard Redux State",
    body: "For users accessing the application through the native browser, the solution was intentionally conventional. Using Redux as a top-level state management library fit the problem perfectly. It is predictable, industry-standard, and well suited for managing global application state in a single-instance environment. In this scenario, there is only one running instance of the application, no risk of state collision, and no need for additional abstraction. Adopting Redux here allowed us to move quickly.",
  },
  {
    heading: "Portal Access and the Need for Isolated State",
    body: "The portal environment introduced a very different challenge. Multiple instances of the same application could exist simultaneously, all within the same browser context. Each instance needed to be fully isolated, authorization-aware, and independent from the others. A single global Redux store would not work here. State collisions, unintended side effects, and feature leakage between instances would be inevitable. This is where we deliberately deviated from the traditional approach.",
  },
  {
    heading: "Two-Level State Management Using Instance-Scoped State",
    body: "To solve this, we implemented a two-level state management model. Every time the application is initialized or reinitialized inside the portal, a unique instanceId is generated. This instanceId remains constant for the entire lifecycle of that application instance. All state for that instance is namespaced under this identifier, effectively creating isolated state containers within a single Redux store. Conceptually, the state structure looks like this:",
    code: `redux_state = {
  instanceId_1: { ... },
  instanceId_2: { ... }
}`,
  },
  {
    heading: "Persisting State Without Breaking Statelessness",
    body: "To persist state across the session lifecycle — and only for the duration of that lifecycle — we relied on browser sessionStorage. Session storage was a deliberate choice. It is scoped to the tab, automatically cleared when the session ends, and enforces a hard size limit. These constraints worked for the requirements: no session recovery and no long-lived persistence. At the end of a session, state is destroyed by default, without any additional cleanup logic. Statelessness is preserved by design, not by convention in that when users switch between tabs in the portal, the sessionStorage data is maintained but when the browser context is closed, the session is cleaned up by convention.",
  },
  {
    heading: "Optimizing Persistence Through Lifecycle Events",
    body: "Rather than continuously syncing state to storage, we optimized persistence by storing state only when the tab loses focus. This significantly reduces unnecessary writes and avoids performance overhead during normal interaction. When the user returns to the tab, the application is reinstantiated, state is rehydrated from sessionStorage into the Redux store, and then removed from storage synchronously. This completes the state lifecycle cleanly and predictably. This feature was implemented based on the specific requirements of the product and understanding execution context, state boundaries, and lifecycle constraints, and then designing around them.",
  },
];
