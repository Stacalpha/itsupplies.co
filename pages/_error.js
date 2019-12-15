import Link from 'next/link';
// import Head from 'next/head';

import Layout from '../components/my_layout';
import wooApi from '../services/woo_api';
import wpApi from '../services/wp_api';

import './styles/index.scss';
import Carousel from '../components/carousel';

const getCategoryTree = () => {
  // Make API call.

  // Build the array.
  const categoryTree = [
    ['Servers', 'link/1', [
      ['Rack Servers', 'link/2'],
      ['Tower Servers', 'Link/3'],
      ['Blade Servers', 'Link/4'],
    ]],
    ['Accessories', 'Link/5', [
      ['Memory', 'link/6'],
      ['Power Supplies', 'link/7'],
      ['Hard Drives', 'link/8'],
      ['Processors', 'link/9'],
      ['Controllers', 'link/10'],
      ['Adapters', 'link/11'],
      ['Rail Kits', 'link/12'],
      ['Cables', 'link/13'],
      ['Others', 'link/14'],
    ]],
    ['HPE Networking', 'link/15', [
      ['Networking Attached Storage', 'link/16'],
      ['MSA', 'link/17'],
      ['Tape Drives', 'link/18'],
    ]],
  ];

  return categoryTree;
};

export default function Homepage(props) {
  return (
    <Layout categories={props.categoryTree}>
      <section className="landing-section">
        <Carousel mediaItems={props.carousel} />
      </section>

      <section className="bestsellers">
        <div className="bestsellers__header">
          <h2 className="bestsellers__title">
            Bestsellers
          </h2>

          <ul className="bestsellers__categories-list">
            
          </ul>
        </div>
      </section>
    </Layout>
  );
}

Homepage.getInitialProps = async function() {
  try {
    // Get List of products
    const {data: products} = await wooApi.get("products", {
      per_page: 20, // 20 products per page
    });

    const categoryTree = getCategoryTree();

    const carousel = await wpApi('get', '/media', {categories: 31});

    console.log(carousel.map((item)=> item.source_url));

    return {
      products,
      categoryTree,
      carousel,
    };
  }

  catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range.
      console.log(error.response.status);
      //
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response recieved');
      //
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    console.log('Config', error.config);
    
    return {};
  }
};


