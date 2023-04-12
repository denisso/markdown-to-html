import React from "react";
import styles from "./Container.module.scss";
import { MarkdownEditor } from "./MarkdownEditor";
import { HTMLComponent } from "./HTMLComponent";
import { Header } from "./Header";
import { ContextProvider } from "./Context";

export const Container = () => {

  return (
    <ContextProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.main}>
          <section className={styles.editor}>
            <MarkdownEditor />
          </section>
          <section className={styles.output}>
            <HTMLComponent />
          </section>
        </main>
      </div>
    </ContextProvider>
  );
};
