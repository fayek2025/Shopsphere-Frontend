import { View, Text } from 'react-native'
import { useTheme } from '@react-navigation/native';
import React from 'react'
import { useRef } from 'react';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheetModal from '@gorhom/bottom-sheet'

import FilterView from './FilterView';
import CustomBackdrop from './CustomBackdrop';
type BottomSheetModalProps = { 
    snapPoints?: any
    index?: number
    ref?: any
    onChange?: (index: number) => void
    enablePanDownToClose?: boolean
   
    
    handleCloseModal: () => void
}

const BottomSheets = ({snapPoints  , handleCloseModal   } : BottomSheetModalProps) => {
    const { colors } = useTheme();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  return (
    
    <BottomSheetModal
          snapPoints={snapPoints}
          index={-1}
          ref={bottomSheetRef}
          onChange={
            (index) => {

              console.log("Current State" + " " + index);
              if (index === 0) {
                // Programmatically dismiss when swiped down
                bottomSheetRef.current?.close();
                console.log(index);
              }
            }


          }
          enablePanDownToClose={true}

          backdropComponent={(props) => <CustomBackdrop {...props} />}
          backgroundStyle={{
            borderRadius: 24,
            backgroundColor: colors.card,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.primary,
          }}
        >
          <BottomSheetScrollView style={{ flex: 1 }}>

            <FilterView handleCloseModal={handleCloseModal} />



          </BottomSheetScrollView>
        </BottomSheetModal>
  )
}

export default BottomSheets;