gg_trg_Melee_Initialization = nil
function InitGlobals()
end

function Unit000031_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000032_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000039_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000044_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000047_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000048_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000049_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000050_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000051_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000053_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000055_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000056_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000059_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000066_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000067_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000068_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000072_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000075_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000078_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000083_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000084_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000085_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000086_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000091_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000097_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000099_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000116_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000119_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000122_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000125_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000128_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000129_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000134_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000136_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000139_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000141_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000145_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000146_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000149_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000150_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000157_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000159_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 5), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000160_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000161_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000164_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000165_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000168_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000169_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000172_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000173_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000175_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 1), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000177_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_CHARGED, 3), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000181_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000182_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 6), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000187_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_POWERUP, 2), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function Unit000188_DropItems()
    local trigWidget = nil
    local trigUnit = nil
    local itemID = 0
    local canDrop = true
    trigWidget = bj_lastDyingWidget
    if (trigWidget == nil) then
        trigUnit = GetTriggerUnit()
    end
    if (trigUnit ~= nil) then
        canDrop = not IsUnitHidden(trigUnit)
        if (canDrop and GetChangingUnit() ~= nil) then
            canDrop = (GetChangingUnitPrevOwner() == Player(PLAYER_NEUTRAL_AGGRESSIVE))
        end
    end
    if (canDrop) then
        RandomDistReset()
        RandomDistAddItem(ChooseRandomItemEx(ITEM_TYPE_PERMANENT, 5), 100)
        itemID = RandomDistChoose()
        if (trigUnit ~= nil) then
            UnitDropItem(trigUnit, itemID)
        else
            WidgetDropItem(trigWidget, itemID)
        end
    end
    bj_lastDyingWidget = nil
    DestroyTrigger(GetTriggeringTrigger())
end

function CreateNeutralHostile()
    local p = Player(PLAYER_NEUTRAL_AGGRESSIVE)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), -7231.6, 462.2, 270.000, FourCC("nogl"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000049_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), -7246.3, 259.7, 267.266, FourCC("nomg"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -7043.9, 273.7, 248.462, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -7447.4, 272.0, 286.713, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), -4217.7, -7498.7, 0.000, FourCC("nogl"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000181_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), -4015.2, -7513.4, 357.266, FourCC("nomg"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -4029.2, -7311.0, 338.462, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -4027.4, -7714.5, 16.713, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -7830.5, -1828.1, 357.590, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000039_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -7442.4, -3696.3, 337.999, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -7934.4, -1712.5, 345.709, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -7944.5, -1902.3, 6.066, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -7457.8, -3955.7, 9.100, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), -7453.6, -3840.9, 355.170, FourCC("nomg"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000044_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -4678.3, 909.6, 347.769, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000086_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitt"), -4819.8, 829.2, 12.975, FourCC("nitt"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), 3275.1, -7741.9, 10.700, FourCC("nogl"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000141_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), 3469.0, -7675.8, 7.327, FourCC("nomg"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 3395.1, -7434.9, 342.380, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("nitp"), -4814.6, 982.5, 359.205, FourCC("nitp"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -1935.6, 5042.7, 237.180, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000031_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), -4732.6, -1574.9, 61.857, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -4898.0, -1537.6, 44.216, FourCC("ngnw"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000173_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -4959.4, -1383.4, 26.359, FourCC("ngns"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000099_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), -4790.9, -1418.0, 42.550, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("nits"), -1965.1, -1585.6, 29.347, FourCC("nits"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), -1732.6, -1656.9, 50.760, FourCC("nogl"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000182_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogm"), -5769.0, 2248.5, 44.850, FourCC("nogm"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000055_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), -5862.3, 2109.6, 65.536, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000175_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -5651.9, 2096.9, 58.406, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -5922.9, 2286.3, 33.348, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nits"), -1524.4, -1864.6, 80.538, FourCC("nits"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), -1613.7, -1988.8, 75.220, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000032_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -1858.3, -1504.9, 27.215, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -2023.3, 1657.3, 331.452, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -1661.3, 2007.0, 299.284, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), -1924.1, 1672.9, 313.690, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000187_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), -1687.5, 1711.3, 309.310, FourCC("nogl"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000188_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -1582.5, 1847.1, 298.204, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogm"), -775.9, 5449.1, 16.630, FourCC("nogm"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000067_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), -920.6, 5424.8, 14.870, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000068_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -807.1, 5234.6, 36.792, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -835.3, 5603.8, 356.751, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -5572.8, 6336.1, 311.074, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -5539.6, 6150.1, 332.256, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000125_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -5672.4, 6174.5, 338.027, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), -3922.2, 3461.3, 325.794, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -3959.3, 3626.8, 357.020, FourCC("ngnw"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000145_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -3846.3, 3748.3, 308.510, FourCC("ngns"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000075_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), -3805.3, 3581.2, 325.794, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), -101.2, 7192.5, 278.390, FourCC("nomg"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000177_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 90.9, 7220.1, 264.581, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -279.3, 7185.1, 290.750, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitt"), -2005.0, 5239.4, 252.050, FourCC("nitt"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitp"), -1861.7, 5180.4, 238.280, FourCC("nitp"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 4373.7, 4488.4, 237.180, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000172_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 4967.3, -1105.6, 134.158, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000072_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogm"), 5686.9, 4191.8, 294.190, FourCC("nogm"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000085_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), 5674.7, 4402.1, 291.766, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000161_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 5519.1, 4324.5, 301.221, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 5845.2, 4253.2, 278.449, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 7603.0, 3464.6, 171.519, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 7524.6, 3813.4, 176.310, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), 7506.1, 3630.7, 210.840, FourCC("nomg"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000091_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 1987.8, -5390.7, 62.585, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000047_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -4339.2, -4720.1, 63.654, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000083_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitt"), 4354.2, 4637.3, 252.050, FourCC("nitt"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitp"), 4497.5, 4578.3, 238.280, FourCC("nitp"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 1620.3, 4977.5, 308.510, FourCC("ngns"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000084_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), 1661.3, 4810.4, 325.794, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 1507.3, 4855.9, 357.020, FourCC("ngnw"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000146_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), -1429.4, -4659.3, 151.857, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -6640.6, 4788.8, 291.521, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -6809.3, 4530.6, 323.770, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), -6699.7, 4630.3, 305.590, FourCC("nomg"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000078_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 3463.2, -7869.0, 27.428, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), 7201.5, -648.2, 90.000, FourCC("nogl"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000097_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), 7216.1, -445.7, 87.266, FourCC("nomg"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 7013.8, -459.7, 68.462, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 7417.3, -457.9, 106.713, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), 4363.3, 6920.7, 201.290, FourCC("nogl"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000059_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), 4163.1, 6895.0, 205.365, FourCC("nomg"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 4211.9, 6679.7, 186.745, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 4140.0, 7148.1, 222.464, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), -3262.0, 7162.6, 213.550, FourCC("nogl"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000053_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), -3474.2, 7144.6, 224.801, FourCC("nomg"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -3342.0, 6933.9, 207.842, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -3431.0, 7421.1, 234.480, FourCC("ngns"))
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -1839.3, -8268.1, 83.507, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000048_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -1747.3, -8389.1, 108.163, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), -1917.7, -8383.5, 88.031, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 5770.1, -6662.7, 145.881, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000116_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 5814.2, -6785.8, 132.519, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 5877.2, -6578.1, 156.533, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 7787.9, 1846.1, 174.927, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000119_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 7754.1, 1709.8, 183.481, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 7685.1, 1969.0, 213.831, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 1902.6, 7450.2, 271.365, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000122_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 1798.2, 7544.9, 303.095, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 1991.9, 7553.6, 285.015, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogm"), -5716.8, -4439.9, 88.440, FourCC("nogm"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000128_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), -5721.3, -4653.7, 94.917, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000056_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -5546.2, -4530.9, 100.938, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -5872.9, -4501.1, 77.862, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -143.1, -8103.4, 103.093, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 91.5, -7990.4, 127.550, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), 8.6, -8102.1, 115.950, FourCC("nomg"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000134_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), 4757.2, 1146.8, 252.196, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 4909.7, 1103.0, 234.556, FourCC("ngnw"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000165_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 5014.8, 999.1, 216.698, FourCC("ngns"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000164_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), 4842.7, 1002.8, 232.889, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), 3973.1, -3962.4, 177.168, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 4010.0, -4127.9, 159.528, FourCC("ngnw"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000051_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), 3896.9, -4249.4, 141.670, FourCC("ngns"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000050_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), 3856.1, -4082.2, 157.861, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -1466.8, -4824.7, 134.216, FourCC("ngnw"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000139_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngns"), -1621.0, -4886.1, 116.359, FourCC("ngns"))
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000136_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), -1586.4, -4717.6, 132.550, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("nitt"), 5134.2, -1096.6, 162.050, FourCC("nitt"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 6817.3, -4678.4, 167.856, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 6580.6, -4903.9, 110.590, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nomg"), 6701.3, -4767.9, 144.820, FourCC("nomg"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000149_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 1520.9, -1773.3, 118.204, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), 1557.9, -1609.2, 129.310, FourCC("nogl"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000159_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 1762.5, -1535.6, 146.948, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), 1699.2, -1693.9, 133.690, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000157_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 1646.5, -1970.7, 119.284, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -1585.5, -1745.3, 71.119, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), 1603.0, 2001.3, 255.220, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000150_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nits"), 1954.4, 1598.1, 209.347, FourCC("nits"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nits"), 1513.7, 1877.1, 260.538, FourCC("nits"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogl"), 1721.9, 1669.4, 230.760, FourCC("nogl"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000066_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogm"), 5636.8, -2558.6, 237.040, FourCC("nogm"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000160_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), 5774.1, -2396.3, 220.441, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000169_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 5854.6, -2596.2, 212.680, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 5583.6, -2406.8, 252.496, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitp"), 5075.2, -1239.9, 148.280, FourCC("nitp"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nith"), 999.7, -6136.1, 150.364, FourCC("nith"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000129_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nitt"), 2047.0, -5561.5, 72.050, FourCC("nitt"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitp"), 1846.4, -5454.2, 58.280, FourCC("nitp"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogm"), 740.4, -6109.5, 160.500, FourCC("nogm"))
    SetUnitAcquireRange(u, 200.0)
    t = CreateTrigger()
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_DEATH)
    TriggerRegisterUnitEvent(t, u, EVENT_UNIT_CHANGE_OWNER)
    TriggerAddAction(t, Unit000168_DropItems)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 1847.6, 1517.4, 207.215, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 853.0, -6222.2, 152.238, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 872.5, -5976.9, 182.954, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), 1574.8, 1757.8, 251.119, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitt"), -4261.1, -4869.9, 72.050, FourCC("nitt"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nitp"), -4497.2, -4716.3, 58.280, FourCC("nitp"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("nogr"), -1824.2, 1609.5, 326.948, FourCC("nogr"))
    SetUnitAcquireRange(u, 200.0)
    u = BlzCreateUnitWithSkin(p, FourCC("ngnb"), 1544.4, 4690.4, 325.794, FourCC("ngnb"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -4184.7, -7258.1, 339.033, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -4208.7, -7719.8, 13.258, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -6990.9, 429.3, 249.033, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -7452.6, 453.3, 283.258, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 3222.8, -7478.4, 349.592, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 3320.7, -7984.3, 30.290, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 6960.8, -615.2, 69.033, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 7422.5, -639.3, 103.258, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -3230.4, 6940.2, 197.253, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), -3271.0, 7383.6, 225.427, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 4372.7, 6698.6, 186.742, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngnw"), 4282.4, 7248.3, 221.170, FourCC("ngnw"))
    u = BlzCreateUnitWithSkin(p, FourCC("nitr"), 1961.6, -1583.5, 151.452, FourCC("nitr"))
    SetUnitAcquireRange(u, 200.0)
end

function CreateNeutralPassiveBuildings()
    local p = Player(PLAYER_NEUTRAL_PASSIVE)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), -4608.0, -7552.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 20000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), 4160.0, -4288.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 16000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), -5056.0, -1728.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 16000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), -1344.0, -5056.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 16000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngad"), 1856.0, -1856.0, 270.000, FourCC("ngad"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), -4160.0, 3776.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 16000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), 1344.0, 5056.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 16000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), 5056.0, 1280.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 16000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngme"), 128.0, -8320.0, 270.000, FourCC("ngme"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), 2880.0, -7744.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 20000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), -7232.0, 896.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 20000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngme"), -7744.0, -3776.0, 270.000, FourCC("ngme"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngme"), -6912.0, 4736.0, 270.000, FourCC("ngme"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngad"), -1920.0, 1920.0, 270.000, FourCC("ngad"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngme"), -128.0, 7424.0, 270.000, FourCC("ngme"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngme"), 7808.0, 3712.0, 270.000, FourCC("ngme"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngme"), 6912.0, -4992.0, 270.000, FourCC("ngme"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), 7232.0, -960.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 20000)
    u = BlzCreateUnitWithSkin(p, FourCC("nmrk"), -1856.0, -1856.0, 270.000, FourCC("nmrk"))
    SetUnitColor(u, ConvertPlayerColor(0))
    u = BlzCreateUnitWithSkin(p, FourCC("nmrk"), 1856.0, 1856.0, 270.000, FourCC("nmrk"))
    SetUnitColor(u, ConvertPlayerColor(0))
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), -2880.0, 7232.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 20000)
    u = BlzCreateUnitWithSkin(p, FourCC("ngol"), 4672.0, 6912.0, 270.000, FourCC("ngol"))
    SetResourceAmount(u, 20000)
    u = BlzCreateUnitWithSkin(p, FourCC("ntav"), -64.0, 128.0, 270.000, FourCC("ntav"))
    SetUnitColor(u, ConvertPlayerColor(0))
end

function CreatePlayerBuildings()
end

function CreatePlayerUnits()
end

function CreateAllUnits()
    CreateNeutralPassiveBuildings()
    CreatePlayerBuildings()
    CreateNeutralHostile()
    CreatePlayerUnits()
end

function Trig_Melee_Initialization_Actions()
    MeleeStartingVisibility()
    MeleeStartingHeroLimit()
    MeleeGrantHeroItems()
    MeleeStartingResources()
    MeleeClearExcessUnits()
    MeleeStartingUnits()
end

function InitTrig_Melee_Initialization()
    gg_trg_Melee_Initialization = CreateTrigger()
    TriggerAddAction(gg_trg_Melee_Initialization, Trig_Melee_Initialization_Actions)
end

function InitCustomTriggers()
    InitTrig_Melee_Initialization()
end

function RunInitializationTriggers()
    ConditionalTriggerExecute(gg_trg_Melee_Initialization)
end

function InitCustomPlayerSlots()
    SetPlayerStartLocation(Player(0), 0)
    SetPlayerColor(Player(0), ConvertPlayerColor(0))
    SetPlayerRacePreference(Player(0), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(0), false)
    SetPlayerController(Player(0), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(1), 1)
    SetPlayerColor(Player(1), ConvertPlayerColor(1))
    SetPlayerRacePreference(Player(1), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(1), false)
    SetPlayerController(Player(1), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(2), 2)
    SetPlayerColor(Player(2), ConvertPlayerColor(2))
    SetPlayerRacePreference(Player(2), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(2), false)
    SetPlayerController(Player(2), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(3), 3)
    SetPlayerColor(Player(3), ConvertPlayerColor(3))
    SetPlayerRacePreference(Player(3), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(3), false)
    SetPlayerController(Player(3), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(4), 4)
    SetPlayerColor(Player(4), ConvertPlayerColor(4))
    SetPlayerRacePreference(Player(4), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(4), false)
    SetPlayerController(Player(4), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(5), 5)
    SetPlayerColor(Player(5), ConvertPlayerColor(5))
    SetPlayerRacePreference(Player(5), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(5), false)
    SetPlayerController(Player(5), MAP_CONTROL_COMPUTER)
end

function InitCustomTeams()
    SetPlayerTeam(Player(0), 0)
    SetPlayerTeam(Player(1), 0)
    SetPlayerTeam(Player(2), 0)
    SetPlayerTeam(Player(3), 0)
    SetPlayerTeam(Player(4), 0)
    SetPlayerTeam(Player(5), 0)
end

function InitAllyPriorities()
    SetStartLocPrioCount(2, 2)
    SetStartLocPrio(2, 0, 1, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(2, 1, 3, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(3, 2)
    SetStartLocPrio(3, 0, 2, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(3, 1, 4, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(4, 2)
    SetStartLocPrio(4, 0, 3, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(4, 1, 5, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(5, 2)
    SetStartLocPrio(5, 0, 0, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(5, 1, 4, MAP_LOC_PRIO_HIGH)
end

function main()
    SetCameraBounds(-8704.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -8960.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 8704.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 8448.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -8704.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 8448.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 8704.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -8960.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
    SetDayNightModels("Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl", "Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl")
    NewSoundEnvironment("Default")
    SetAmbientDaySound("LordaeronWinterDay")
    SetAmbientNightSound("LordaeronWinterNight")
    SetMapMusic("Music", true, 0)
    CreateAllUnits()
    InitBlizzard()
    InitGlobals()
    InitCustomTriggers()
    RunInitializationTriggers()
end

function config()
    SetMapName("TRIGSTR_001")
    SetMapDescription("TRIGSTR_003")
    SetPlayers(6)
    SetTeams(6)
    SetGamePlacement(MAP_PLACEMENT_USE_MAP_SETTINGS)
    DefineStartLocation(0, -3648.0, 6976.0)
    DefineStartLocation(1, 3904.0, 6848.0)
    DefineStartLocation(2, 7104.0, -192.0)
    DefineStartLocation(3, 3648.0, -7680.0)
    DefineStartLocation(4, -3840.0, -7424.0)
    DefineStartLocation(5, -7232.0, 128.0)
    InitCustomPlayerSlots()
    InitCustomTeams()
    InitAllyPriorities()
end

