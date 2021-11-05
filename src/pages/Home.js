import Card from '../components/Card';

const Home = ({
    search,
    setSearch,
    searchItems,
    loading,
    items,
    onAddToCart,
    onAddToFavorite,
}) => {
    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1 className='mb-40'>
                    {search ? `Поиск по запросу "${search}"` : 'Все кроссовки'}
                </h1>
                <div className='search-block d-flex'>
                    <img src='/img/search.svg' alt='Search' />
                    {search && (
                        <img
                            className='clear cu-p'
                            src='/img/btn-remove.svg'
                            alt='Clear'
                            onClick={() => setSearch('')}
                        />
                    )}
                    <input
                        placeholder='Поиск...'
                        onChange={searchItems}
                        value={search}
                    />
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                {loading}
                {items
                    .filter(item =>
                        item.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item, index) => (
                        <Card
                            onAddToCart={obj => onAddToCart(obj)}
                            onAddToFavorite={obj => onAddToFavorite(obj)}
                            key={index}
                            {...item}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Home;
