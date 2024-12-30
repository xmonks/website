export default {
  meta: {
    lang: "en",
    title: "hckr.space",
    description: "",
    url: "https://hckr.space/"
  },
  podcastsSection: {
    list: ["data-talk", "kanarci-v-siti", "people-ops", "exec", "hra-skolou", "plodne-hovory", "appcast"]
  },
  jahoda() {
    console.log(this);
    return "jahoda";
  }
};
