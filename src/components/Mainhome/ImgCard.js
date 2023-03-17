import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {Link} from 'react-router-dom';
import test from './ImgCard.json' //ImgCard.json <<<< 테스트용 데이터



export default function MasonryImageList() {
  return (
  //  이미지카드 디자인 틀
    <Box
    sx={{
      width: "auto",
      height: "auto",
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
    }}
  >
    
    <ImageList variant="masonry" cols={4} gap={10}>
    {/* ImgCard.json에서 데이터를 가져오는 부분 */}
      {test.itemData.map((item) => ( 
      // hover-zoom 을 이용해서 이미지 위에 마우스를 올리면 이미지가 확대되는 효과
        <ImageListItem key={item.img} className="bg-image hover-zoom"> 
          <Link to="detail">
            <img
              src={`${item.img}?w=400&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
            />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  </Box>
  );
}

