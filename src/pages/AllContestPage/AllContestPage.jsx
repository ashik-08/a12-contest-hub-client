import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useContest from "../../components/hooks/useContest";
import { useState } from "react";
import Container from "../../components/Container/Container";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ContestCard from "./ContestCard";

const AllContestPage = () => {
  const tags = [
    "Business Contest",
    "Article Writing Contest",
    "Medical Contest",
    "Gaming Contest",
  ];
  const [tabIndex, setTabIndex] = useState(tags[0]);

  // load data with custom hook
  const [allContest] = useContest();
  const business = allContest.filter(
    (type) => type.contest_type === "Business Contest"
  );
  const article = allContest.filter(
    (type) => type.contest_type === "Article Writing Contest"
  );
  const medical = allContest.filter(
    (type) => type.contest_type === "Medical Contest"
  );
  const gaming = allContest.filter(
    (type) => type.contest_type === "Gaming Contest"
  );

  return (
    <>
      <Helmet>
        <title>Contest Hub | All Contest</title>
      </Helmet>
      <section>
        <SectionTitle subHeading="--- Let's see ---" heading="all contests" />
        <Container>
          <Tabs
            selectedIndex={tags.indexOf(tabIndex)}
            onSelect={(index) => setTabIndex(tags[index])}
            className="mt-14 md:mt-16 lg:mt-20"
          >
            <TabList className="mb-10 md:mb-14 lg:mb-16 xl:mb-20 uppercase flex flex-wrap justify-center gap-10 lg:text-lg xl:text-xl font-medium">
              {tags.map((tag) => (
                <Tab key={tag}>{tag}</Tab>
              ))}
            </TabList>
            <TabPanel>{<ContestCard contest={business} />}</TabPanel>
            <TabPanel>{<ContestCard contest={article} />}</TabPanel>
            <TabPanel>{<ContestCard contest={medical} />}</TabPanel>
            <TabPanel>{<ContestCard contest={gaming} />}</TabPanel>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default AllContestPage;
