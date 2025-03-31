const axios = require('axios');
const { logger } = require('../utils/logger');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX_ID;

// Sample/fallback data for when API limit is reached
const FALLBACK_DATA = {
  interview: [
    {
      title: "Google L5 SWE Interview Experience 2024",
      url: "https://leetcode.com/discuss/interview-experience/google-l5-swe-2024",
      snippet: "System Design + Coding rounds detailed experience",
      source: "leetcode",
      categories: ["interview"],
      date: new Date(),
      metadata: {
        type: "System Design Interview",
        companies: ["Google"]
      }
    },
    // Add 2-3 more interview fallbacks...
  ],
  salary: [
    {
      title: "FAANG Total Compensation Thread 2024",
      url: "https://leetcode.com/discuss/compensation/faang-tc-2024",
      snippet: "Latest compensation packages at top tech companies",
      source: "leetcode",
      categories: ["salary"],
      date: new Date(),
      metadata: {
        type: "Salary",
        companies: ["Meta", "Amazon", "Google"]
      }
    },
    // Add 2-3 more salary fallbacks...
  ]
};

// Separate query configurations
const categoryConfigs = {
  interview: {
    baseQuery: 'site:leetcode.com/discuss',
    queries: [
      '"Interview Experience" "Google" "2024"',
      '"Interview Experience" "Amazon" "2024"',
      '"Interview Experience" "Meta" "2024"'
    ],
    categoryFilter: title => title.toLowerCase().includes('interview')
  },
  salary: {
    baseQuery: 'site:leetcode.com/discuss',
    queries: [
      '"Total Compensation" "TC" "2024"',
      '"Compensation Package" "Offer" "2024"',
      '"Salary Discussion" "2024"'
    ],
    categoryFilter: title => 
      title.toLowerCase().includes('compensation') || 
      title.toLowerCase().includes('tc') ||
      title.toLowerCase().includes('salary')
  }
};

async function fetchGoogleResults() {
  try {
    // Try to get data from Google API first
    const results = await fetchFromGoogleAPI();
    if (results.length > 0) {
      return results;
    }
    
    // If no results or API limit reached, use fallback data
    logger.info('Using fallback data due to API limits');
    return [...FALLBACK_DATA.interview, ...FALLBACK_DATA.salary];
  } catch (error) {
    logger.error('Google API error, using fallback data:', error.message);
    return [...FALLBACK_DATA.interview, ...FALLBACK_DATA.salary];
  }
}

async function fetchFromGoogleAPI() {
  const results = [];
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Limit total API calls per execution
  const MAX_CALLS = 3;
  let apiCalls = 0;

  for (const [category, config] of Object.entries(categoryConfigs)) {
    if (apiCalls >= MAX_CALLS) {
      logger.warn('API call limit reached, stopping further calls');
      break;
    }

    try {
      await delay(2000); // Rate limiting delay
      apiCalls++;

      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: GOOGLE_API_KEY,
          cx: GOOGLE_CX,
          q: `site:leetcode.com/discuss ${category === 'salary' ? 'compensation "TC"' : 'interview experience'} 2024`,
          num: 3,
          dateRestrict: 'w1'
        }
      });

      if (response.data.items) {
        results.push(...response.data.items.map(item => ({
          title: item.title,
          url: item.link,
          snippet: item.snippet || item.title,
          source: 'leetcode',
          categories: [category],
          date: new Date(),
          metadata: {
            type: getCategoryType(category, item.title),
            companies: extractCompanies(item.title)
          }
        })));
      }
    } catch (err) {
      if (err.response?.status === 429) {
        logger.warn('API quota exceeded, switching to fallback data');
        break;
      }
      logger.error(`Error fetching ${category}:`, err.message);
    }
  }

  return results;
}

function isQualityContent(item) {
  const title = item.title.toLowerCase();
  const snippet = item.snippet.toLowerCase();
  const spamTerms = ['spam', 'advertisement', 'promoted'];
  if (spamTerms.some(term => title.includes(term))) return false;
  if (snippet.length < 50) return false;
  return true;
}

function extractCompanies(text) {
  const companies = ['Google', 'Meta', 'Facebook', 'Amazon', 'Microsoft', 'Apple', 'Netflix'];
  return companies.filter(company => text.includes(company));
}

function getSourceFromUrl(url) {
  if (url.includes('leetcode.com')) return 'leetcode';
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('linkedin.com')) return 'hiring';
  if (url.includes('techcrunch.com') || url.includes('artificial')) return 'tech-news';
  return 'news';
}

function getCategoryType(category, text) {
  const lowerText = text.toLowerCase();
  if (category === 'salary') {
    if (lowerText.includes('new grad')) return 'New Grad Salary';
    if (lowerText.includes('senior')) return 'Senior Salary';
    return 'Salary';
  }
  if (category === 'interview') {
    if (lowerText.includes('system design')) return 'System Design Interview';
    if (lowerText.includes('coding')) return 'Coding Interview';
    if (lowerText.includes('behavioral')) return 'Behavioral Interview';
    return 'Interview Experience';
  }
  return category;
}

function extractLevel(text) {
  const levels = {
    entry: /(new grad|junior|entry level|l3|ict2)/i,
    mid: /(mid level|l4|ict3|sde2)/i,
    senior: /(senior|l5|l6|ict4|ict5|staff|principal)/i
  };
  for (const [level, pattern] of Object.entries(levels)) {
    if (pattern.test(text)) return level;
  }
  return 'unknown';
}

module.exports = { fetchGoogleResults };
