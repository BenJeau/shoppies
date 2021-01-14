import { Page, Layout, TextContainer, Link, Frame } from "@shopify/polaris";

import { LinkMinor } from "@shopify/polaris-icons";

const Home = () => {
  return (
    <Frame>
      <div style={{ paddingTop: 30 }}>
        <Page
          title="The Shoppies"
          subtitle="Shopify 2021 Summer Internship Challenge"
          secondaryActions={[
            {
              content: "Github Repository",
              external: true,
              url: "https://github.com/BenJeau/shoppies",
              icon: LinkMinor,
            },
          ]}
        >
          <Layout>
            <Layout.Section>
              <TextContainer>
                2021 - Made by{" "}
                <Link url="https://jeaurond.dev" external>
                  Benoît Jeaurond
                </Link>
              </TextContainer>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </Frame>
  );
};

export default Home;