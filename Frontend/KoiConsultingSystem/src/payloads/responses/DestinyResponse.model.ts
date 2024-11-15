interface KoiFish {
    fishId: number;
    fishName: string;
    imgUrl: string;
    description: string;
  }
  
  interface FishPond {
    fishPondId: number;
    pondName: string;
    imgUrl: string;
    description: string;
  }
  
  interface DestinyId {
    destinyId: number;
    destinyName: string;
    koiFishList: KoiFish[];
    fishPondList: FishPond[];
  }
  
  interface DestinyResponse {
    statusCode: number;
    message: string;
    destinyId: DestinyId;
  }
  